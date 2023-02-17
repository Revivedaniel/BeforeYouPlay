const { FreshData } = require("../models");

function createFreshData(game) {
  return new Promise(async function (resolve, reject) {
    let freshData = [];
    const freshDataObj = JSON.parse(game.custom_datapoints);
    // for each data point, create a new fresh data object and add it to freshData
    for (const key in game) {
      // This helps only evaluate the data in the mongoos object
      if (typeof game[key] !== "string") continue;
      if (key === "custom_datapoints") continue;
      if (key === "id") continue;

      let data;
      if (typeof game[key] !== "string") {
        data = JSON.stringify(game[key]);
      } else {
        data = game[key];
      }

      freshData.push({
        game_id: game._id,
        created_at: new Date(),
        up_votes: 0,
        down_votes: 0,
        potentially_outdated: false,
        data,
        data_title: key,
        admin_approvals: 0,
        votes_total: 0,
        manually_typed: false,
      });
    }
    // for each datapoint in custom_datapoints, create a new fresh data object and add it to freshData
    for (let key in freshDataObj) {
      // if the key is gameTeam, then add each element in the gameTeam object to freshData
      if (key === "gameTeam") {
        for (let key2 in JSON.parse(freshDataObj[key])) {
          freshData.push({
            game_id: game._id,
            created_at: new Date(),
            up_votes: 0,
            down_votes: 0,
            potentially_outdated: false,
            data: JSON.stringify(JSON.parse(freshDataObj[key])[key2]),
            data_title: key2,
            admin_approvals: 0,
            votes_total: 0,
            manually_typed: false,
          });
        }
      } else {
        freshData.push({
          game_id: game._id,
          created_at: new Date(),
          up_votes: 0,
          down_votes: 0,
          potentially_outdated: false,
          data: JSON.stringify(freshDataObj[key]),
          data_title: key,
          admin_approvals: 0,
          votes_total: 0,
          manually_typed: false,
        });
      }
    }
    await FreshData.insertMany(freshData);
    resolve();
  });
}

module.exports = createFreshData;
