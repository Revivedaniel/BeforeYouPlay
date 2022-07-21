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
              "Client-ID": `${process.env.client_id}`,
              Authorization: `Bearer ${process.env.token}`,
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

            let releaseYear = game?.original_release_date?.split("-")[0] || "No Release Date";

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
    addReview: async (
      parent,
      { game_id, stars, review_body, title },
      context
    ) => {
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
