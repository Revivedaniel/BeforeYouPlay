const db = require("../config/connection");
const seedGames = require("./game");
const createReviews = require("./review");
const seedUsers = require("./user");

db.once("open", async () => {
  try {
    // Users
    await seedUsers();

    // Reviews
    const reviews = await createReviews();
    // Games
    await seedGames(reviews);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    throw err;
  }
});
