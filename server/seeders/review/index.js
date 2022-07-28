const reviewData = require("./reviewData.json");
const { Review, Game } = require("../../models");

function createReviews() {
  return new Promise(async function (resolve, reject) {
    let reviews = [];
    reviewData.forEach(async (review) => {
      const { stars } = review;
      const gameIds = [
        "62e21197accc951c308a1f79",
        "62e21197accc951c308a1f80",
        "62e21197accc951c308a1f81",
        "62e21197accc951c308a1f82",
      ];
      const game_id = gameIds[Math.floor(Math.random() * gameIds.length)];

      const newReview = new Review({
        username: "Seeds",
        game_id,
        stars,
      });
      reviews.push(newReview);
    });
    resolve(reviews);
  });
}

module.exports = createReviews;
