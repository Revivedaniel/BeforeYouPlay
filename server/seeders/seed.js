const db = require("../config/connection");
const seedGames = require("./game");
const gameData = require("./gameData.json");
const seedUsers = require("./user");

db.once("open", async () => {
  try {
    // Users
    await seedUsers();

    // Games
    await seedGames(gameData)

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    throw err;
  }
});
