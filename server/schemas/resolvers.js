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
        let game = await Game.find({ slug: slug });
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
            data: `fields age_ratings.rating,age_ratings.category, cover.image_id, genres.name, name, slug, summary, release_dates.y; where slug = "${slug}";`,
          });
          const gameData = response.data[0];
          if (gameData.release_dates) {
            // if there is a release date, get the first entries year
            gameData.release_date = gameData.release_dates[0].y;
          } else {
            // if there there is no release date, set it to -1
            gameData.release_date = -1;
          }
          let genres;
          if (gameData.genres) {
            // If there are genres, map through and return the name of the genre
            genres = gameData.genres.map((genreObj) => {
              return genreObj.name;
            });
          } else {
            // If there are no genres, set it to no genres
            genres = ["No Genres"];
          }
          // age_rating is the ESRB rating name
          if (gameData.age_ratings) {
            gameData.age_rating = parseInt(
              gameData.age_ratings.filter((ageObj) => ageObj.category === 1)[0]
                .rating
            );
          } else {
            gameData.age_rating = -1;
          }

          if (!gameData.cover) {
            gameData.cover = {
              id: -1,
            };
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
    games: async (parent, { page, perPage }) => {
      try {
        let games = await Game.find({})
          .sort({ reviews: -1 })
          .limit(perPage)
          .skip(perPage * (page - 1));
        let count = await Game.countDocuments();

        return { games, count };
      } catch (error) {
        console.log(error);
      }
    },
    searchGame: async (parent, { search, page }) => {
      try {
        console.log(page);
        // Use the 500 limit search
        let countResponse = await axios({
          url: "https://api.igdb.com/v4/games",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Client-ID": `${process.env.client_id}`,
            Authorization: `Bearer ${process.env.token}`,
          },
          data: `search "${search}"; limit 500;`,
        });
        // count the responses
        // assign the count to a variable
        let count = countResponse.data.length;

        //if count 0, null, or undefined, throw error
        if (count === 0 || undefined || null) {
          throw new Error("No games found");
        }

        // Searching for game
        let response = await axios({
          url: "https://api.igdb.com/v4/games",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Client-ID": `${process.env.client_id}`,
            Authorization: `Bearer ${process.env.token}`,
          },
          data: `search "${search}"; limit 10; offset ${(page - 1) * 10};`,
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
    addReview: async (parent, { game_id, stars, review_body, title }, context) => {
      if (context.user) {
        const review = new Review({
          username: context.user.username,
          game_id,
          title,
          stars,
          review_body,
        });

        await Game.findByIdAndUpdate(game_id, { $push: { reviews: review } });

        return review;
      }

      throw new AuthenticationError("Please, log in first!");
    },
  },
};

module.exports = resolvers;
