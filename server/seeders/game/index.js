const { Game } = require("../../models");
const gameData = require("./gameData.json");

function seedGames(reviews) {
    return new Promise(async function (resolve, reject) {
        // stringify the genres array
    gameData.map((game) => {
        let newArr = JSON.stringify(game.genres);
        game.genres = newArr;
        return game;
      });
      // strigify the age_ratings object
      gameData.map((game) => {
        let newObj = JSON.stringify(game.age_ratings);
        game.age_ratings = newObj;
        return game;
      });
      // stringify the lazy_afternoon_videos array
      gameData.map((game) => {
        let newArr = JSON.stringify(game.lazy_afternoon_videos);
        game.lazy_afternoon_videos = newArr;
        return game;
      });
      // stringify custom_datapoints object
      gameData.map((game) => {
        let newObj = JSON.stringify(game.custom_datapoints);
        game.custom_datapoints = newObj;
        return game;
      });
      // stringify platforms array
      gameData.map((game) => {
        let newArr = JSON.stringify(game.platforms);
        game.platforms = newArr;
        return game;
      });
      // insert reviews into gameData
      gameData.map((game) => {
        game.reviews = reviews;
        return game;
      })
  
      await Game.deleteMany();
      const games = await Game.insertMany(gameData);
      const gameIds = games.map((game) => game._id);
      resolve(gameIds);
    })
}

module.exports = seedGames;