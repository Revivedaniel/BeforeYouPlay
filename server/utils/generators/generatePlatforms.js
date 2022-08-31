function generatePlatforms(openai, game) {
  return new Promise(async (resolve, reject) => {
    const capitalizedGame = game[0].toUpperCase() + game.slice(1).toLowerCase();

    const prompt = `What consoles can you play The Legend of Zelda: Majora's Mask on?

      Nintendo 64,Nintendo GameCube,Nintendo 3DS, Wii.
      
      What consoles can you play Mega Man Battle Network?
      
      Game Boy Advance,Nintendo GameCube.
      
      What consoles can you play ${capitalizedGame}?`;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });
    const stringifiedPlatforms = JSON.stringify(
      completion.data.choices[0].text
        .trim()
        .replace(/^\s+|\s+$/g, "")
        .split(",")
    );
    resolve(stringifiedPlatforms);
  });
}
module.exports = generatePlatforms;
