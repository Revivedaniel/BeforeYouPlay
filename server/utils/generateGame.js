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
    const overview = await generateOverview(openai, game);
    const genres = await generateGenres(openai, game);
    const platforms = await generatePlatforms(openai, game);
    const releaseDate = await generateReleaseDate(openai, game);
    const publisher = await generatePublisher(openai, game);
    const developer = await generateDeveloper(openai, game);
    const gameModes = await generateGameModes(openai, game);
    const ageRatings = await generateAgeRatings(openai, game);
    const howLongToBeat = await generateHowLongToBeat(openai, game);
    const directors = await generateDirectors(openai, game);
    const producers = await generateProducers(openai, game);
    const designers = await generateDesigners(openai, game);
    const programmers = await generateProgrammers(openai, game);
    const artists = await generateArtists(openai, game);
    const composers = await generateComposers(openai, game);
    const themes = await generateThemes(openai, game);
    const gameplayOverview = await generateGameplayOverview(openai, game);
    const relatedGames = await generateRelatedGames(openai, game);

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
