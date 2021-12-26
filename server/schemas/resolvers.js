const { AuthenticationError } = require("apollo-server-express");
const { User, Game } = require('../models');

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
        console.log(error)
      }
    },
    game: async (parent, { slug }) => {
      try {
        //This will return an array so we return game[0] for the first entry
        let game = await Game.find({ slug: slug })

        return game[0];
      } catch (error) {
        console.log(error)
      }
    },
    games: async () => {
      try {
        let games = await Game.find({});

        return games;
      } catch (error) {
        
      }
    }
  },
};

module.exports = resolvers;
