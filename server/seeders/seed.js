const db = require('../config/connection');
// Import seeds
const { User, Game } = require('../models');
// Game data
const gameData = require('./gameData.json')

db.once('open', async () => {
  try {
    // Await seeds
    await User.deleteMany();
    await User.create({
      firstName: "Daniel",
      lastName: "Stark",
      email: "daniel@testmail.com",
      password: "password12345",
    });
  
    await User.create({
      firstName: "Maxwell",
      lastName: "Walin",
      email: "maxwell@testmail.com",
      password: "password12345",
    });
  
    await User.create({
      firstName: "Jesus",
      lastName: "Bautista",
      email: "jesus@testmail.com",
      password: "password12345",
    });
  
    await User.create({
      firstName: "Parth",
      lastName: "Bhatt",
      email: "parth@testmail.com",
      password: "password12345",
    });

    // Games
    gameData.map((game) => {
      let newArr = JSON.stringify(game.genres)
      game.genres = newArr
      return game; 
    })
    await Game.deleteMany();
    await Game.insertMany(gameData)

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
