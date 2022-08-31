const { Game, FreshData } = require("../../models");
const createFreshData = require("../../utils/createFreshData");

function seedFreshData() {
  return new Promise(async function (resolve, reject) {
    await FreshData.deleteMany();
    const games = await Game.find();
    for (let i = 0; i < games.length; i++) {
      await createFreshData(games[i]);
    }
    resolve();
  });
}

module.exports = seedFreshData;
