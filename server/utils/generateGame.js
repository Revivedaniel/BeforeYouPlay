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

    const [
      overview,
      genres,
      platforms,
      releaseDate,
      publisher,
      developer,
      gameModes,
      ageRatings,
      howLongToBeat,
      directors,
      producers,
      designers,
      programmers,
      artists,
      composers,
      themes,
      gameplayOverview,
      relatedGames,
    ] = await Promise.all([
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
