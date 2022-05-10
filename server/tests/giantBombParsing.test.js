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
  expect(giantBombData).toHaveProperty("title");
  expect(giantBombData).toHaveProperty("image");
  expect(giantBombData).toHaveProperty("releaseYear");
  expect(giantBombData).toHaveProperty("overview");
  expect(giantBombData).toHaveProperty("genres");
  expect(giantBombData).toHaveProperty("ageRatings");
});

// test that giantBombParsing returns the correct title
test("giantBombParsing returns the correct title", () => {
  const giantBombData = giantBombParsing(gameData);

  expect(giantBombData.title).toBe("DoDonPachi Resurrection");
});
// test that giantBombParsing returns a cloudinary image url
// test that giantBombParsing returns the correct release year
test("giantBombParsing returns the correct release year", () => {
  const giantBombData = giantBombParsing(gameData);

  expect(giantBombData.releaseYear).toBe("2010");
});
// test that giantBombParsing returns the correct overview
test("giantBombParsing returns the correct overview", () => {
  const giantBombData = giantBombParsing(gameData);
  // double quotes are turned into single quotes
  // a tags are removed
  expect(giantBombData.overview).toBe(
    "<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>"
  );
});
// test that giantBombParsing returns the correct genres
test("giantBombParsing returns the correct genres", () => {
  const giantBombData = giantBombParsing(gameData);

  expect(giantBombData.genres).toBe(JSON.stringify(["Shoot 'Em Up"]));
});
// test that giantBombParsing returns the correct age ratings
test("giantBombParsing returns the correct age ratings", () => {
  const giantBombData = giantBombParsing(gameData);

  expect(giantBombData.ageRatings).toBe(JSON.stringify({ CERO: "A", PEGI: "12+", OFLC: "G" }));
});

// test that if the gameData is missing a title, giantBombParsing returns an object and the title is "No Title"
test('if the gameData is missing a title, giantBombParsing returns "No Title"', () => {
  const giantBombData = giantBombParsing(missingGameData[0]);

  expect(giantBombData).toBeInstanceOf(Object);
  expect(giantBombData).toHaveProperty("title");
  expect(giantBombData.title).toBe("No Title");
  // test for cloudinary image later
  expect(giantBombData.ageRatings).toBe(JSON.stringify({ CERO: "A", PEGI: "12+", OFLC: "G" }));
  expect(giantBombData.genres).toBe(JSON.stringify(["Shoot 'Em Up"]));
  expect(giantBombData.overview).toBe(
    "<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>"
  );
  expect(giantBombData.releaseYear).toBe("2010");
});
// test that if the gameData is missing an image, giantBombParsing returns "No Image"
test('if the gameData is missing an image, giantBombParsing returns "No Image"', () => {
  const giantBombData = giantBombParsing(missingGameData[1]);

  expect(giantBombData).toBeInstanceOf(Object);
  expect(giantBombData).toHaveProperty("image");
  expect(giantBombData.image).toBe("No Image");
  expect(giantBombData.title).toBe("DoDonPachi Resurrection");
  expect(giantBombData.ageRatings).toBe(JSON.stringify({ CERO: "A", PEGI: "12+", OFLC: "G" }));
  expect(giantBombData.genres).toBe(JSON.stringify(["Shoot 'Em Up"]));
  expect(giantBombData.overview).toBe("<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>");
  expect(giantBombData.releaseYear).toBe("2010");
});
// test that if the gameData is missing a release year, giantBombParsing returns "No Release Year"
test('if the gameData is missing a release year, giantBombParsing returns "No Release Year"', () => {
  const giantBombData = giantBombParsing(missingGameData[2]);

  expect(giantBombData).toBeInstanceOf(Object);
  expect(giantBombData).toHaveProperty("releaseYear");
  expect(giantBombData.releaseYear).toBe("No Release Year");
  expect(giantBombData.title).toBe("DoDonPachi Resurrection");
  // test for cloudinary image later
  expect(giantBombData.genres).toBe(JSON.stringify(["Shoot 'Em Up"]));
  expect(giantBombData.ageRatings).toBe(JSON.stringify({ CERO: "A", PEGI: "12+", OFLC: "G" }));
  expect(giantBombData.overview).toBe("<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>");
});
// test that if the gameData is missing an overview, giantBombParsing returns "No Overview"
test('if the gameData is missing an overview, giantBombParsing returns "No Overview"', () => {
    const giantBombData = giantBombParsing(missingGameData[3]);

    expect(giantBombData).toBeInstanceOf(Object);
    expect(giantBombData).toHaveProperty("overview");
    expect(giantBombData.overview).toBe("No Overview");
    expect(giantBombData.title).toBe("DoDonPachi Resurrection");
    // test for cloudinary image later
    expect(giantBombData.genres).toBe(JSON.stringify(["Shoot 'Em Up"]));
    expect(giantBombData.ageRatings).toBe(JSON.stringify({ CERO: "A", PEGI: "12+", OFLC: "G" }));
    expect(giantBombData.releaseYear).toBe("2010"); 
})
// test that if the gameData is missing genres, giantBombParsing returns an array with an empty string
test('if the gameData is missing genres, giantBombParsing returns an array with an empty string', () => {
    const giantBombData = giantBombParsing(missingGameData[4]);

    expect(giantBombData).toBeInstanceOf(Object);
    expect(giantBombData).toHaveProperty("genres");
    expect(giantBombData.genres).toEqual([""]);
    expect(giantBombData.title).toBe("DoDonPachi Resurrection");
    // test for cloudinary image later
    expect(giantBombData.ageRatings).toBe(JSON.stringify({ CERO: "A", PEGI: "12+", OFLC: "G" }));
    expect(giantBombData.releaseYear).toBe("2010");
    expect(giantBombData.overview).toBe("<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>");
})
// test that if the gameData is missing age ratings, giantBombParsing returns an object with a single key of esrb: "No Age Ratings"
test('if the gameData is missing age ratings, giantBombParsing returns an object with a single key of esrb: "No Age Ratings"', () => {
    const giantBombData = giantBombParsing(missingGameData[5]);

    expect(giantBombData).toBeInstanceOf(Object);
    expect(giantBombData).toHaveProperty("ageRatings");
    expect(giantBombData.ageRatings).toEqual(JSON.stringify({ ESRB: "No Age Ratings" }));
    expect(giantBombData.title).toBe("DoDonPachi Resurrection");
    // test for cloudinary image later
    expect(giantBombData.genres).toBe(JSON.stringify(["Shoot 'Em Up"]));
    expect(giantBombData.releaseYear).toBe("2010");
    expect(giantBombData.overview).toBe("<p>Dodonpachi Resurrection ('Dodonpachi Daifukkatsu' in Japan) is a bullet hell shoot 'em up developed by Cave. It was released in Japanese arcades in 2008. An iPhone port with an exclusive iPhone Mode was released in 2010, as was an Xbox 360 port with updated hi-res graphics and a number of extra modes. The Xbox 360 version is set to be brought to Europe by Rising Star Games in November 2011. An Android version is set to be released in October, 2011.</p><p>Dodonpachi Daifukkatsu Black Label for Xbox 360 was released in February 3, 2011 in Japan. This disc release included the Black Label mode released as downloadable content for the original Daifukkatsu port, as well as an exclusive Ketsui-crossover 'Black Label Arrange' mode.</p>");
})
// test that extra data is added to the giantBombData object
test('extra data is added to the giantBombData object', () => {
    const giantBombData = giantBombParsing(gameData);

    expect(giantBombData).toBeInstanceOf(Object);
    expect(giantBombData).toHaveProperty("title");
    expect(giantBombData).toHaveProperty("genres");
    expect(giantBombData).toHaveProperty("ageRatings");
    expect(giantBombData).toHaveProperty("releaseYear");
    expect(giantBombData).toHaveProperty("overview");
    expect(giantBombData).toHaveProperty("image");
    expect(giantBombData).toHaveProperty("aliases");
    expect(giantBombData).toHaveProperty("api_detail_url");
    expect(giantBombData).toHaveProperty("date_added");
    expect(giantBombData).toHaveProperty("date_last_updated");
    expect(giantBombData).toHaveProperty("deck");
    expect(giantBombData).toHaveProperty("expected_release_day");
    expect(giantBombData).toHaveProperty("expected_release_month");
    expect(giantBombData).toHaveProperty("expected_release_quarter");
    expect(giantBombData).toHaveProperty("expected_release_year");
    expect(giantBombData).toHaveProperty("guid");
    expect(giantBombData).toHaveProperty("id");
    expect(giantBombData).toHaveProperty("image_tags");
    expect(giantBombData).toHaveProperty("number_of_user_reviews");
    expect(giantBombData).toHaveProperty("platforms");
    expect(giantBombData).toHaveProperty("site_detail_url");
    expect(giantBombData).toHaveProperty("images");
    expect(giantBombData).toHaveProperty("videos");
    expect(giantBombData).toHaveProperty("characters");
    expect(giantBombData).toHaveProperty("concepts");
    expect(giantBombData).toHaveProperty("developers");
    expect(giantBombData).toHaveProperty("first_appearance_characters");
    expect(giantBombData).toHaveProperty("first_appearance_concepts");
    expect(giantBombData).toHaveProperty("first_appearance_locations");
    expect(giantBombData).toHaveProperty("first_appearance_objects");
    expect(giantBombData).toHaveProperty("first_appearance_people");
    expect(giantBombData).toHaveProperty("franchises");
    expect(giantBombData).toHaveProperty("killed_characters");
    expect(giantBombData).toHaveProperty("locations");
    expect(giantBombData).toHaveProperty("objects");
    expect(giantBombData).toHaveProperty("people");
    expect(giantBombData).toHaveProperty("publishers");
    expect(giantBombData).toHaveProperty("releases");
    expect(giantBombData).toHaveProperty("dlcs");
    expect(giantBombData).toHaveProperty("similar_games");
    expect(giantBombData).toHaveProperty("themes");
})
