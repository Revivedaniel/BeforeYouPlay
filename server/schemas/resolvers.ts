import { AuthenticationError } from "apollo-server-express";
import { User, Game, Video } from "../models/index.js";
import axios from "axios";
import { signToken } from "../utils/auth.js";
import generateGame from "../utils/generateGame.js";
import parseCompletion from "../utils/parseCompletion.js";
import submitNewGame from "../utils/submitNewGame.js";
import { PlatformDoc } from "../utils/types.js";

interface Context {
  user: {
    _id: string;
  };
}

interface GameTitle {
  title: string;
}

interface Page {
  page: number;
}

interface Search {
  search: string;
  page: number;
}

interface Platform {
  platform: string;
  page: number;
}

const resolvers = {
  Query: {
    user: async (parent: any, args: any, context: Context) => {
      if (context.user) {
        let user = await User.findById(context.user._id);
        return user;
      }

      throw new AuthenticationError("Please, log in first!");
    },
    game: async (parent: any, { title }: GameTitle) => {
      try {
        // search for the game title in the database
        let titleResponse = await axios({
          url: `${process.env.VGI_API_URI}/game-titles/${title}`,
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
            url: `${process.env.VGI_API_URI}/games/${title}`,
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });
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
    games: async (parent: any, { page }: Page) => {
      const limit = 15;
      const offset = page - 1 * limit;

      try {
        let games = await Game.find({}).skip(offset).limit(limit).sort({ _id: -1 });
        return games;
      } catch (error) {
        console.log(error);
      }
    },
    searchGame: async (parent: any, { search, page }: Search) => {
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
          return { statusCode: 204, games: [] as any };
        }

        return { games: response.data };
      } catch (error) {
        console.log(error);
      }
    },
    featuredGame: async () => {
      try {
        let response = await axios({
          url: `${process.env.VGI_API_URI}/game-titles/with-content?&limit=1&page=1`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        // if response is empty, return empty
        if (response.data.length === 0) {
          return;
        }
        const gameResponse = await await axios({
          url: `${process.env.VGI_API_URI}/games/${response.data[0].title}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const featuredGame = {
          title: response.data[0].title,
          imageName: response.data[0].imageName,
          shortDescription: JSON.parse(gameResponse.data.summary)['Gameplay Mechanics'].substring(0, 89)
        };
        return featuredGame;
      } catch (error) {
        console.log(error);
      }
    },
    gamesByPlatform: async (parent: any, { platform, page }: Platform) => {
      try {
        let response = await axios({
          url: `${process.env.VGI_API_URI}/game-titles/by-platform?platform=${platform}&limit=20&page=${page}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        // if response is empty, return empty
        if (response.data.length === 0) {
          return { statusCode: 204, games: [] as any };
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
          url: `${process.env.VGI_API_URI}/platforms`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        response.data = response.data.map((platform: PlatformDoc) => {
          return platform.name;
        });

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    allGameTitles: async (parent: any, { page }: Page) => {
      try {
        let response = await axios({
          url: `${process.env.VGI_API_URI}/game-titles?page=${page}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        return { games: response.data };
      } catch (error) {
        console.log(error);
      }
    },
    gameWithVideos: async (parent: any, { page }: Page) => {
      try {
        let response = await axios({
          url: `${process.env.VGI_API_URI}/game-titles/with-content?&limit=20&page=${page}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        // if response is empty, return empty
        if (response.data.length === 0) {
          return { statusCode: 204, games: [] as any };
        }
        return { games: response.data.slice(1) };
      } catch (error) {
        console.log(error);
      }
    },
    video: async (parent: any, { title }: GameTitle) => {
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
    addUser: async (parent: any, args: any) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      } catch (error) {
        console.log(error);
        throw new AuthenticationError("Email has already been used");
      }
    },
    updateUser: async (parent: any, args: any, context: Context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Please, log in first!");
    },
    login: async (parent: any, { email, password }: { email: string; password: string }) => {
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

export default resolvers;
