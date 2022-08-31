const db = require("../config/connection");
const seedGames = require("./game");
const createReviews = require("./review");
const seedUsers = require("./user");
const seedFreshData = require("./freshData");

db.once("open", async () => {
  try {
    // Users
    await seedUsers();

    // Reviews
    const reviews = await createReviews();
    // Games
    await seedGames(reviews);
    // FreshData
    await seedFreshData();

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
    throw err;
  }
});
