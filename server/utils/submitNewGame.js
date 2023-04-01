const mongoose = require("mongoose");
const { gameSchema } = require("../models/Game");
const { gameTitleSchema } = require("../models/GameTitle");

function submitNewGame(game) {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await mongoose.createConnection(
        process.env.VGI_API_MONGODB_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false
        }
      );
      const Game = connection.model("Game", gameSchema);
      const GameTitle = connection.model("GameTitle", gameTitleSchema);
      const count = await Game.countDocuments();
      const newGame = await Game.create({ ...game, gameId: count + 1 });
      // if the new game was created successfully,
      // update the gameTitle to gameGenerated = true
      // and add the platforms and genres to the gameTitle
      if (newGame) {
        const gameTitle = await GameTitle.findOneAndUpdate(
          { title: newGame.title },
          {
            gameGenerated: true,
            platforms: newGame.platforms,
            genres: newGame.genres,
          },
          { new: true }
        );
        if (!gameTitle) {
          console.log("gameTitle not found");
        }
      } else {
        console.log("newGame not created");
        reject("newGame not created")
      }

      resolve(newGame);
      connection.close();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = submitNewGame;
