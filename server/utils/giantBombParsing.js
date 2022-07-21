function giantBombParsing(gameData) {
  let result = gameData.results;
  // use result.name as the title or "No Title" if there is no name
  let title = result?.name ? result.name : "No Title";
  // use result.image.original_url as the image or "No Image" if there is no image
  const image = result?.image?.original_url || "No Image";
  // use result.original_release_date as the release date or "No Release Date" if there is no release date
  const releaseYear = result?.original_release_date?.split("-")[0] || "No Release Year";

  // parse the description data point to define the game description as just the overview
  // remove <a> tags from the description
  // turns double quotes into single quotes
  let overview;
  if (result?.description) {
    overview = result.description
    .split("</h2>")[1]
    .split("<h2>")[0]
    .split("<a")
    .map((str, i) => {
      const output =
        i == 0
          ? str
          : str
              .split("</a>")
              .map((a) => {
                let output;
                if (a.includes("href")) {
                  let working = true;
                  output = a
                    .split("")
                    .map((b) => {
                      b == ">" ? (working = false) : true;
                      if (working || b == ">") {
                        return;
                      }
                      return b;
                    })
                    .join("");
                } else {
                  output = a;
                }
                return output;
              })
              .join("");
      return output;
    })
    .join("")
    .replace(/"/g, "'")
  } else {
    overview = "No Overview";
  };

  // giantBombParsing returns the correct genres
  let genres;
  if (result?.genres) {
    genres = JSON.stringify(
        result?.genres.map((genre) => {
          return genre.name;
        })
      );
  } else {
      genres = [""];
  };

  // giantBombParsing returns the correct age ratings
  let ageRatings = {};
  if (result?.original_game_rating) {
    result.original_game_rating.forEach((rating) => {
        const splitRating = rating.name.split(": ")
        ageRatings[splitRating[0]] = splitRating[1];
    });
  } else {
    ageRatings.ESRB = "No Age Ratings";
  };

  let output = {
    title,
    image,
    releaseYear,
    overview,
    genres,
    ageRatings: JSON.stringify(ageRatings),
  };

  // add remaining data points to the output object
  for (const key in result) {
      const element = result[key];
      switch (key) {
        case "name":
          break;
        case "image":
          break;
        case "original_release_date":
          break;
        case "description":
          break;
        case "genres":
          break;
        case "original_game_rating":
          break;
      
        default:
          output[key] = element;
          break;
      }
  }

  return output;
}

module.exports = giantBombParsing;
