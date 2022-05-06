const giantBombParsing = require("../utils/giantBombParsing");
const gameData = require("../seeders/giantBombGameData.json");

const missingGameData = require("../seeders/giantBombMissingGameData.json");

// Data missing order
// 0. title
// 1. image
// 2. releaseYear
// 3. overview
// 4. genres
// 5. ageratings

// test that giantBombParsing returns a json object with Title an Image, Release Year, Overview, Genres, and Age ratingsS
test("giantBombParsing returns an object with Title an Image, Release Year, Overview, Genres, and Age rating", () => {
  const giantBombData = giantBombParsing(gameData);

  expect(giantBombData).toBeInstanceOf(Object);
  expect(giantBombData).toHaveProperty("Title");
  expect(giantBombData).toHaveProperty("Image");
  expect(giantBombData).toHaveProperty("ReleaseYear");
  expect(giantBombData).toHaveProperty("Overview");
  expect(giantBombData).toHaveProperty("Genres");
  expect(giantBombData).toHaveProperty("AgeRatings");
});

// test that giantBombParsing returns the correct title
test("giantBombParsing returns the correct title", () => {
  const giantBombData = giantBombParsing(gameData);

  expect(giantBombData.Title).toBe("DoDonPachi Resurrection");
});
// test that giantBombParsing returns a cloudinary image url
// test that giantBombParsing returns the correct release year
test("giantBombParsing returns the correct release year", () => {
  const giantBombData = giantBombParsing(gameData);

  expect(giantBombData.ReleaseYear).toBe("2010");
});
// test that giantBombParsing returns the correct overview
test("giantBombParsing returns the correct overview", () => {
  const giantBombData = giantBombParsing(gameData);
  // double quotes are turned into single quotes
  // a tags are removed
  expect(giantBombData.Overview).toBe(
    "<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>"
  );
});
// test that giantBombParsing returns the correct genres
test("giantBombParsing returns the correct genres", () => {
  const giantBombData = giantBombParsing(gameData);

  expect(giantBombData.Genres).toBe(["Shoot 'Em Up"]);
});
// test that giantBombParsing returns the correct age ratings
test("giantBombParsing returns the correct age ratings", () => {
  const giantBombData = giantBombParsing(gameData);

  expect(giantBombData.AgeRatings).toBe({ cero: "A", pegi: "12+", oflc: "G" });
});

// test that if the gameData is missing a title, giantBombParsing returns an object and the title is "No Title"
test('if the gameData is missing a title, giantBombParsing returns "No Title"', () => {
  const giantBombData = giantBombParsing(missingGameData[0]);

  expect(giantBombData).toBeInstanceOf(Object);
  expect(giantBombData).toHaveProperty("Title");
  expect(giantBombData.Title).toBe("No Title");
  // test for cloudinary image later
  expect(giantBombData.AgeRatings).toBe({ cero: "A", pegi: "12+", oflc: "G" });
  expect(giantBombData.Genres).toBe(["Shoot 'Em Up"]);
  expect(giantBombData.Overview).toBe(
    "<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>"
  );
  expect(giantBombData.ReleaseYear).toBe("2010");
});
// test that if the gameData is missing an image, giantBombParsing returns "No Image"
test('if the gameData is missing an image, giantBombParsing returns "No Image"', () => {
  const giantBombData = giantBombParsing(missingGameData[1]);

  expect(giantBombData).toBeInstanceOf(Object);
  expect(giantBombData).toHaveProperty("Image");
  expect(giantBombData.Image).toBe("No Image");
  expect(giantBombData.Title).toBe("DoDonPachi Resurrection");
  expect(giantBombData.AgeRatings).toBe({ cero: "A", pegi: "12+", oflc: "G" });
  expect(giantBombData.Genres).toBe(["Shoot 'Em Up"]);
  expect(giantBombData.Overview).toBe("<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>");
  expect(giantBombData.ReleaseYear).toBe("2010");
});
// test that if the gameData is missing a release year, giantBombParsing returns "No Release Year"
test('if the gameData is missing a release year, giantBombParsing returns "No Release Year"', () => {
  const giantBombData = giantBombParsing(missingGameData[2]);

  expect(giantBombData).toBeInstanceOf(Object);
  expect(giantBombData).toHaveProperty("ReleaseYear");
  expect(giantBombData.ReleaseYear).toBe("No Release Year");
  expect(giantBombData.Title).toBe("DoDonPachi Resurrection");
  // test for cloudinary image later
  expect(giantBombData.Genres).toBe(["Shoot 'Em Up"]);
  expect(giantBombData.AgeRatings).toBe({ cero: "A", pegi: "12+", oflc: "G" });
  expect(giantBombData.Overview).toBe("<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>");
  expect(giantBombData.ReleaseYear).toBe("2010");
});
// test that if the gameData is missing an overview, giantBombParsing returns "No Overview"
test('if the gameData is missing an overview, giantBombParsing returns "No Overview"', () => {
    const giantBombData = giantBombParsing(missingGameData[3]);

    expect(giantBombData).toBeInstanceOf(Object);
    expect(giantBombData).toHaveProperty("Overview");
    expect(giantBombData.Overview).toBe("No Overview");
    expect(giantBombData.Title).toBe("DoDonPachi Resurrection");
    // test for cloudinary image later
    expect(giantBombData.Genres).toBe(["Shoot 'Em Up"]);
    expect(giantBombData.AgeRatings).toBe({ cero: "A", pegi: "12+", oflc: "G" });
    expect(giantBombData.ReleaseYear).toBe("2010"); 
})
// test that if the gameData is missing genres, giantBombParsing returns an array with an empty string
test('if the gameData is missing genres, giantBombParsing returns an array with an empty string', () => {
    const giantBombData = giantBombParsing(missingGameData[4]);

    expect(giantBombData).toBeInstanceOf(Object);
    expect(giantBombData).toHaveProperty("Genres");
    expect(giantBombData.Genres).toEqual([""]);
    expect(giantBombData.Title).toBe("DoDonPachi Resurrection");
    // test for cloudinary image later
    expect(giantBombData.AgeRatings).toBe({ cero: "A", pegi: "12+", oflc: "G" });
    expect(giantBombData.ReleaseYear).toBe("2010");
    expect(giantBombData.Overview).toBe("<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>");
})
// test that if the gameData is missing age ratings, giantBombParsing returns an object with a single key of esrb: "No Age Ratings"
test('if the gameData is missing age ratings, giantBombParsing returns an object with a single key of esrb: "No Age Ratings"', () => {
    const giantBombData = giantBombParsing(missingGameData[5]);

    expect(giantBombData).toBeInstanceOf(Object);
    expect(giantBombData).toHaveProperty("AgeRatings");
    expect(giantBombData.AgeRatings).toEqual({ esrb: "No Age Ratings" });
    expect(giantBombData.Title).toBe("DoDonPachi Resurrection");
    // test for cloudinary image later
    expect(giantBombData.Genres).toBe(["Shoot 'Em Up"]);
    expect(giantBombData.ReleaseYear).toBe("2010");
    expect(giantBombData.Overview).toBe("<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>");
})
