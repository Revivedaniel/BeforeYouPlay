const { AuthenticationError } = require("apollo-server-express");
const { User, Game } = require("../models");
const axios = require("axios");
const { signToken } = require("../utils/auth");
const generateGame = require("../utils/generateGame");
const parseCompletion = require("../utils/parseCompletion");
const submitNewGame = require("../utils/submitNewGame");
const { Video } = require("../models");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        let user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Please, log in first!");
    },
    game: async (parent, {title}) => {
      try {
        // search for the game title in the database
        let titleResponse = await axios({
          url: `http://localhost:7777/game-titles/${title}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        // if it does not exist responde with 204
        if (titleResponse.status === 204) {
          return { statusCode: 204 };
        }
        
        // if it does exist, check if it was generated by the AI
        // if it was, return the game data
        // if it was not, generate the game with the AI
        if (titleResponse.data.gameGenerated) {
          let gameResponse = await axios({
            url: `http://localhost:7777/games/${title}`,
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });
          console.log(gameResponse.data);
          return gameResponse.data;
        } else {
            // Genrate the game with AI
            const generatedGameData = await generateGame(title);
            // parse the response for the JSON data
            const jsonResponse = parseCompletion(generatedGameData);
            // submit the new game to the VGI database
            const newGame = await submitNewGame(jsonResponse);
            
            return newGame;
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
    video: async (parent, { title }) => {
      try {
        // find a video by gameTitle
        // if video is found, return the video
        // if video is not found, return 204
        const videoData = Video.findOne({ gameTitle: title });

        if (videoData) {
          return videoData;
        }

        return { statusCode: 204, video: {} };
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
  },
};

module.exports = resolvers;
