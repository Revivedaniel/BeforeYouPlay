const { AuthenticationError } = require("apollo-server-express");
const { User, Game, FreshData } = require("../models");
const axios = require("axios");
const { signToken } = require("../utils/auth");
const Review = require("../models/Review");
const generateGame = require("../utils/generateGame");
const { Configuration, OpenAIApi } = require("openai");
const createFreshData = require("../utils/createFreshData");
const updateCustomDatapoints = require("../utils/updateCustomDatapoints");
const filterTitle = require("../utils/filterTitle");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        let user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Please, log in first!");
    },
    game: async (parent, { slug, title, gameImage = "" }) => {
      try {
        let game = await Game.find({ slug: slug });
        
        // If the game does not exist in the DB, generate it with OpenAI
        if (game.length === 0) {
          const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
          });

          const openai = new OpenAIApi(configuration);

          const gameData = await generateGame(openai, title);

          let newGame = {
            title,
            summary: gameData.overview,
            image_url: gameImage,
            release_year: gameData.releaseDate,
            genres: gameData.genres,
            age_ratings: gameData.ageRatings,
            slug,
            reviews: [],
            custom_datapoints: gameData.customDataPoints,
            platforms: gameData.platforms,
            lazy_afternoon_videos: JSON.stringify([]),
            lazy_afternoon_review: "",
            vgm_link: "",
            needs_editing: true,
          };

          game = await Game.create(newGame);
          
          createFreshData(game);
          return game;
        } else {
          return game[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    games: async (parent, { page }) => {
      const limit = 15;
      const offset = parseInt(page - 1) * limit;

      try {
        let games = await Game.find({}).skip(offset).limit(limit).sort({ _id: -1 });
        // let count = await Game.countDocuments();
        console.log(`games: ${games.length}, offset: ${offset}, limit: ${limit}`);
        return games;
      } catch (error) {
        console.log(error);
      }
    },
    searchGame: async (parent, { search, page }) => {
      try {
        let response = await axios({
          url: `${process.env.VGI_API_URI}/game-titles/search?q=${search}&limit=20&page=${page}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        // if response is empty, return empty
        if (response.data.length === 0) {
          return { statusCode: 204, games: [] };
        }

        return { games: response.data };
      } catch (error) {
        console.log(error);
      }
    },
    featuredGame: async () => {

      try {
        let response = await axios({
          // url: `${process.env.VGI_API_URI}/game-titles/search?q=${search}&limit=20&page=${page}`,
          url: `http://localhost:7777/game-titles/with-content?&limit=1&page=1`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        // if response is empty, return empty
        if (response.data.length === 0) {
          return { statusCode: 204, games: [] };
        }
        return response.data[0];
      } catch (error) {
        console.log(error);
      }
    },
    gamesByPlatform: async (parent, { platform, page }) => {
      try {
        let response = await axios({
          // url: `${process.env.VGI_API_URI}/game-titles/search?q=${search}&limit=20&page=${page}`,
          url: `http://localhost:7777/game-titles/by-platform?platform=${platform}&limit=20&page=${page}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        // if response is empty, return empty
        if (response.data.length === 0) {
          return { statusCode: 204, games: [] };
        }

        return { games: response.data };
      } catch (error) {
        console.log(error);
      }
    },
    allPlatforms: async () => {
      try {
        let response = await axios({
          // url: `${process.env.VGI_API_URI}/platforms`,
          url: `http://localhost:7777/platforms`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        response.data = response.data.map((platform) => {
          return platform.name;
        });
        console.log(response.data);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    allGameTitles: async (parent, { page }) => {
      try {
        let response = await axios({
          // url: `${process.env.VGI_API_URI}/platforms`,
          url: `http://localhost:7777/game-titles?page=${page}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        console.log(response.data);

        return { games: response.data };
      } catch (error) {
        console.log(error);
      }
    },
    gameWithVideos: async (parent, { page }) => {
      try {
        let response = await axios({
          // url: `${process.env.VGI_API_URI}/game-titles/search?q=${search}&limit=20&page=${page}`,
          url: `http://localhost:7777/game-titles/with-content?&limit=20&page=${page}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        // if response is empty, return empty
        if (response.data.length === 0) {
          return { statusCode: 204, games: [] };
        }

        return { games: response.data };
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log(error);
        throw new AuthenticationError("Email has already been used");
      }
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Please, log in first!");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Email and/or password is incorrect!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Email and/or password is incorrect!");
      }

      const token = signToken(user);

      return { token, user };
    },
    addReview: async (parent, { game_id, stars }, context) => {
      if (context.user) {
        const review = new Review({
          username: context.user.username,
          game_id,
          stars,
        });

        await Game.findByIdAndUpdate(game_id, { $push: { reviews: review } });

        return review;
      }

      throw new AuthenticationError("Please, log in first!");
    },
    rateDataPoint: async (parent, { slug, title, vote }, context) => {
      if (context.user) {
        // Find the game via the slug
        let game = await Game.find({ slug: slug });
        if (game.length === 0) {
          throw new Error("Game not found");
        }

        title = filterTitle(title);

        let freshData;
        // Find the FreshData entry via game ID and title
        // if the vote is positive, add 1 to the positive count
        if (vote > 0) {
          freshData = await FreshData.findOneAndUpdate(
            {
              game_id: game[0]._id,
              data_title: title,
            },
            { $inc: { up_votes: 1, votes_total: 1 } },
            { new: true }
          );
        }
        // Find the FreshData entry via game ID and title
        // if the vote is negative, add 1 to the negative count and subtract 1 from votes_total
        if (vote < 0) {
          freshData = await FreshData.findOneAndUpdate(
            {
              game_id: game[0]._id,
              data_title: title,
            },
            { $inc: { down_votes: 1, votes_total: -1 } },
            { new: true }
          );
        }
        // Find the FreshData entry via game ID and title
        // if the vote is zero, null, or NaN, throw error for invalid vote
        if (vote === 0 || vote === null || isNaN(vote)) {
          throw new Error("Invalid vote");
        }
        // Return the freshData entry
        return freshData;
      }

      throw new AuthenticationError("Please, log in first!");
    },
    updateDataPoint: async (
      parent,
      { slug, title, update, dataType },
      context
    ) => {
      // TODO: make this resolver only accessable for admins

      if (context.user) {
        // Find the game via the slug
        let game = await Game.find({ slug: slug });
        if (game.length === 0) {
          throw new Error("Game not found");
        }

        // Find the FreshData entry via game ID and title
        // Update the data field
        // change manually_typed to true
        // add 1 to admin_approvals
        if (typeof update !== "string") {
          throw new Error("Invalid update");
        }
        let freshData = await FreshData.findOneAndUpdate(
          {
            game_id: game[0]._id,
            data_title: title,
          },
          {
            $set: { data: update, manually_typed: true },
            $inc: { admin_approvals: 1 },
          },
          { new: true }
        );

        // if the dataType is Custom, add the data to the custom_datapoints field
        if (dataType === "Custom" || dataType === "GameTeam") {
          const updatedCustomDatapoints = updateCustomDatapoints(
            game[0].custom_datapoints,
            title,
            update,
            dataType
          );
          await Game.findByIdAndUpdate(game[0]._id, {
            $set: { custom_datapoints: updatedCustomDatapoints },
          });
        } else {
          // if the dataType is Standard, add the data to the game using title as the field name and update as the value
          await Game.findByIdAndUpdate(game[0]._id, { [title]: update });
        }
        // Return the freshData entry
        return freshData;
      }

      throw new AuthenticationError("Please, log in first!");
    },
    deleteDataPoint: async (
      parent,
      { slug, title, dataType },
      context
    ) => {
      // TODO: make this resolver only accessable for admins

      if (context.user) {
        // Find the game via the slug
        let game = await Game.find({ slug: slug });
        if (game.length === 0) {
          throw new Error("Game not found");
        }

        // Find the FreshData entry via game ID and title
        // Update the data field to be null
        let freshData = await FreshData.findOneAndUpdate(
          {
            game_id: game[0]._id,
            data_title: title,
          },
          {
            $set: { data: null, manually_typed: true },
            $inc: { admin_approvals: 1 },
          },
          { new: true }
        );

        // if the dataType is Custom, add the data to the custom_datapoints field
        if (dataType === "Custom" || dataType === "GameTeam") {
          const updatedCustomDatapoints = updateCustomDatapoints(
            game[0].custom_datapoints,
            title,
            null,
            dataType
          );
          await Game.findByIdAndUpdate(game[0]._id, {
            $set: { custom_datapoints: updatedCustomDatapoints },
          });
        } else {
          // if the dataType is Standard, add the data to the game using title as the field name and update as the value
          await Game.findByIdAndUpdate(game[0]._id, { [title]: null });
        }
        // Return the freshData entry
        return freshData;
      }

      throw new AuthenticationError("Please, log in first!");
    },
  },
};

module.exports = resolvers;
