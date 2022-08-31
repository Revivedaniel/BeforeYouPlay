function generateGenres(openai, game) {
  return new Promise(async (resolve, reject) => {
    const capitalizedGame = game[0].toUpperCase() + game.slice(1).toLowerCase();

    const prompt = `What genres is the video game The Legend of Zelda: Majora's Mask?

      action-adventure
      
      What genres is the video game Mega Man Battle Network?
      
      action, adventure, platformer, puzzle, strategy
      
      What genres is the video game ${capitalizedGame}?`;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    const stringifiedGenresArr = JSON.stringify(completion.data.choices[0].text.trim().replace(/^\s+|\s+$/g, '').split(","));

    resolve(stringifiedGenresArr);
  });
}
module.exports = generateGenres;
