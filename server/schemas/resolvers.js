const { AuthenticationError } = require("apollo-server-express");
const { User, Game, FreshData } = require("../models");
const axios = require("axios");
const { signToken } = require("../utils/auth");
const Review = require("../models/Review");
const generateGame = require("../utils/generateGame");
const { Configuration, OpenAIApi } = require("openai");
const createFreshData = require("../utils/createFreshData");
const updateCustomDatapoints = require("../utils/updateCustomDatapoints");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        let user = await User.findById(context.user._id);

        return user;
      }

      throw new AuthenticationError("Please, log in first!");
    },
    game: async (parent, { slug, title }) => {
      try {
        //This will return an array so we return game[0] for the first entry
        let game = await Game.find({ slug: slug });
        //If there is no game with that slug, search IGDB
        if (game.length === 0) {
          // initialize openai
          const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
          });
          const openai = new OpenAIApi(configuration);

          // generate the gamedata
          const gameData = await generateGame(openai, title);

          // New game for mongoose
          let newGame = {
            title,
            summary: gameData.overview,
            image_url: "",
            release_year: gameData.releaseDate,
            genres: gameData.genres,
            age_ratings: gameData.ageRatings,
            slug,
            reviews: [],
            custom_datapoints: gameData.customDataPoints,
            platforms: gameData.platforms,
            lazy_afternoon_videos: "",
            lazy_afternoon_review: "",
            vgm_link: "",
          };
          //Creating the game in our database
          game = await Game.create(newGame);
          createFreshData(game);
          //Returning the new game
          return game;
        } else {
          return game[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    games: async (parent, { page, perPage }) => {
      try {
        let games = await Game.find({}).sort({ reviews: -1 }).limit(34);
        let count = await Game.countDocuments();

        return { games, count };
      } catch (error) {
        console.log(error);
      }
    },
    searchGame: async (parent, { search, page }) => {
      try {
        // search for the search term in the giantbomb api
        let response = await axios({
          url: `https://www.giantbomb.com/api/search/?api_key=${process.env.GIANTBOMB_API_KEY}&format=json&resources=game&limit=10&page=${page}&query=${search}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        // if response is empty, return empty
        if (response.data.results.length === 0) {
          return { games: [], count: 0 };
        }
        // if response is not empty, return the games and set count to the total number of games
        let games = response.data.results;
        let count = response.data.number_of_total_results;
        // for all the games, include image, title, description, rating, releasedate, and genres
        let gameData = games.map((game) => {
          let gameRating;
          game?.original_game_rating
            ? (gameRating = game.original_game_rating[0].name)
            : (gameRating = "No Rating");

          let releaseYear =
            game?.original_release_date?.split("-")[0] || "No Release Date";

          const output = {
            title: game?.name || "",
            summary: game?.deck || "",
            image: game?.image?.original_url || "",
            release_year: releaseYear || "",
            age_rating: gameRating || "",
            slug: game?.name.replace(/\s+/g, "-") || "",
          };

          return output;
        });

        return { games: gameData, count };
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

      // if (context.user) {
      if (true) {
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
            $set: { data: update, manually_typed: true, admin_approvals: 1 },
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
  },
};

module.exports = resolvers;
