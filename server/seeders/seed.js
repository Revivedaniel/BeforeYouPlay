const db = require("../config/connection");
// Import seeds
const { User, Game } = require("../models");
// Game data
const gameData = require("./gameData.json");

db.once("open", async () => {
  try {
    // Await seeds
    await User.deleteMany();
    await User.create({
      username: "Daniel",
      email: "daniel@testmail.com",
      password: "password12345",
    });

    await User.create({
      username: "Maxwell",
      email: "maxwell@testmail.com",
      password: "password12345",
    });

    await User.create({
      username: "Jesus",
      email: "jesus@testmail.com",
      password: "password12345",
    });

    await User.create({
      username: "Parth",
      email: "parth@testmail.com",
      password: "password12345",
    });

    // Games

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
    
    console.log(gameData);

    await Game.deleteMany();
    await Game.insertMany(gameData);

    console.log(await Game.find());

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    throw err;
  }
});
