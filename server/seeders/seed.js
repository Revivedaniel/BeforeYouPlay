const db = require("../config/connection");
const seedGames = require("./game");
const seedUsers = require("./user");

db.once("open", async () => {
  try {
    // Users
    await seedUsers();

    // Games
    await seedGames();

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    throw err;
  }
});
