const {
  generateThemes,
  generateAgeRatings,
  generateArtists,
  generateComposers,
  generateDesigners,
  generateDeveloper,
  generateDirectors,
  generateGameModes,
  generateGameplayOverview,
  generateGenres,
  generateHowLongToBeat,
  generateOverview,
  generatePlatforms,
  generateProducers,
  generateProgrammers,
  generatePublisher,
  generateRelatedGames,
  generateReleaseDate,
} = require("./generators");

function generateGame(openai, game) {
  return new Promise(async (resolve, reject) => {

    const data = await Promise.all([
      generateOverview(openai, game),
      generateGenres(openai, game),
      generatePlatforms(openai, game),
      generateReleaseDate(openai, game),
      generatePublisher(openai, game),
      generateDeveloper(openai, game),
      generateGameModes(openai, game),
      generateAgeRatings(openai, game),
      generateHowLongToBeat(openai, game),
      generateDirectors(openai, game),
      generateProducers(openai, game),
      generateDesigners(openai, game),
      generateProgrammers(openai, game),
      generateArtists(openai, game),
      generateComposers(openai, game),
      generateThemes(openai, game),
      generateGameplayOverview(openai, game),
      generateRelatedGames(openai, game),
    ]);


    const overview = data[0];
    const genres = data[1];
    const platforms = data[2];
    const releaseDate = data[3];
    const publisher = data[4];
    const developer = data[5];
    const gameModes = data[6];
    const ageRatings = data[7];
    const howLongToBeat = data[8];
    const directors = data[9];
    const producers = data[10];
    const designers = data[11];
    const programmers = data[12];
    const artists = data[13];
    const composers = data[14];
    const themes = data[15];
    const gameplayOverview = data[16];
    const relatedGames = data[17];

    resolve({
      overview,
      genres,
      platforms,
      releaseDate,
      ageRatings,
      customDataPoints: JSON.stringify({
        gameTeam: {
          developer,
          directors,
          producers,
          designers,
          programmers,
          artists,
          composers,
          publisher,
        },
        gameModes,
        howLongToBeat,
        themes,
        gameplayOverview,
        relatedGames,
      }),
    });
  });
}

module.exports = generateGame;
