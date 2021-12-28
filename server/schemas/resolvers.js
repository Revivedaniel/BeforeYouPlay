const { AuthenticationError } = require("apollo-server-express");
const { User, Game } = require("../models");
const axios = require("axios");
const { signToken } = require("../utils/auth");
const Review = require("../models/Review");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        let user = await User.findById(context.user._id);

        return user;
      }

      throw new AuthenticationError("Please, log in first!");
    },
    game: async (parent, { slug }) => {
      try {
        //This will return an array so we return game[0] for the first entry
        let game = await Game.find({ slug: slug })
        console.log(game);
        //If there is no game with that slug, search IGDB
        if (game.length === 0) {
          let response = await axios({
            url: "https://api.igdb.com/v4/games",
            method: "POST",
            headers: {
              Accept: "application/json",
              "Client-ID": `${process.env.CLIENT_ID}`,
              Authorization: `Bearer ${process.env.TOKEN}`,
            },
            data: `fields age_ratings.rating, cover.image_id, genres.name, name, slug, summary, release_dates.y; where slug = "${slug}";`,
          });
          const gameData = response.data[0];
          // release date is the first release date
          if (gameData.release_dates) {
            gameData.release_date = gameData.release_dates[0].y;
          } else {
            gameData.release_date = -1;
          }
          // genres is the name of the genre instead of the id and name
          let genres;
          if (gameData.genres) {
            genres = gameData.genres.map((genreObj) => {
              return genreObj.name;
            });
          } else {
            genres = ["No Genres"];
          }
          // age_rating is the ESRB rating name
          if (gameData.age_ratings) {
            gameData.age_rating = gameData.age_ratings[0].rating;
          } else {
            gameData.age_rating = -1;
          }

          // New game for mongoose
          let newGame = {
            title: gameData.name,
            summary: gameData.summary,
            cover_id: gameData.cover.image_id,
            release_year: gameData.release_date,
            genres: JSON.stringify(genres),
            age_rating: gameData.age_rating,
            slug: gameData.slug,
          };
          //Creating the game in our database
          game = await Game.create(newGame);
          //Returning the new game
          return game;
        } else {
          return game[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    games: async () => {
      try {
        let games = await Game.find({});

        return games;
      } catch (error) {}
    },
    searchGame: async (parent, { search }) => {
      try {
        // Searching for game
        let response = await axios({
          url: "https://api.igdb.com/v4/games",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Client-ID": `${process.env.client_id}`,
            Authorization: `Bearer ${process.env.token}`,
          },
          data: `search "${search}"; limit 10;`,
        });
        // mapping the response to be an array of ids
        let ids = response.data.map((data) => {
          return data.id;
        });
        // create an array of queries using the ids array
        let searchQuery = ids.map((id, i) => {
          return `query games "game${i}" {fields age_ratings.rating, cover.image_id, genres.name, name, slug, summary, release_dates.y;where id=${id};};`;
        });
        // make axios call with searchQuery.join("")
        let gamesResponse = await axios({
          url: "https://api.igdb.com/v4/multiquery",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Client-ID": `${process.env.client_id}`,
            Authorization: `Bearer ${process.env.token}`,
          },
          data: `${searchQuery.join("")}`,
        });
        let gameData = gamesResponse.data.map((data) => {
          let newGame = data.result[0];
          // console.log("entering the map")
          // release date is the first release date
          if (newGame.release_dates) {
            newGame.release_date = newGame.release_dates[0].y;
          } else {
            newGame.release_date = -1;
          }
          // genres is the name of the genre instead of the id and name
          let genres;
          if (newGame.genres) {
            genres = newGame.genres.map((genreObj) => {
              return genreObj.name;
            });
          } else {
            genres = ["No Genres"];
          }
          // age_rating is the ESRB rating name
          if (newGame.age_ratings) {
            newGame.age_rating = newGame.age_ratings[0].rating;
          } else {
            newGame.age_rating = -1;
          }
          const output = {
            title: newGame.name,
            summary: newGame.summary,
            cover_id: newGame.cover.image_id,
            release_year: newGame.release_date,
            genres: JSON.stringify(genres),
            age_rating: newGame.age_rating,
            slug: newGame.slug,
          };
          return output;
        });
        console.log(gameData);

        return gameData;
      } catch (error) {}
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
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
    addReview: async (parent, { game_id, stars, review_body }, context) => {
      console.log(context.user)
      if (context.user) {
        const review = new Review({
          username: context.user.username,
          game_id,
          stars,
          review_body,
        });

        await Game.findByIdAndUpdate(game_id, { $push: {reviews: review} })
        
        return review;
      }

      throw new AuthenticationError("Please, log in first!");
    },
  },
};

module.exports = resolvers;
