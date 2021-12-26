const { AuthenticationError } = require("apollo-server-express");
const { User, Game } = require("../models");
const axios = require("axios");

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        let user = await User.findById(context.user._id);

        return user;
      }

      throw new AuthenticationError("Please, log in first!");
    },
    users: async () => {
      try {
        let user = await User.find({});

        return user;
      } catch (error) {
        console.log(error);
      }
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
            data: `fields age_ratings.rating, cover.image_id, genres.name, name, slug, summary, release_dates.y; where slug = "${slug}";`,
          });
          const gameData = response.data[0];
          // release date is the first release date
          gameData.release_date = gameData.release_dates[0].y;
          // genres is the name of the genre instead of the id and name
          let genres = gameData.genres.map((genreObj) => {
            return genreObj.name;
          });
          // age_rating is the ESRB rating name
          gameData.age_rating = gameData.age_ratings[0].rating;

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
  },
};

module.exports = resolvers;
