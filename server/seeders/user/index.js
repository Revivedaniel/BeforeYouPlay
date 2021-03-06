const { User } = require("../../models");

function seedUsers() {
  return new Promise(async function (resolve, reject) {
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
    resolve();
  });
}

module.exports = seedUsers;
