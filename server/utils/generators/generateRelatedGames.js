function generateRelatedGames(openai, game) {
  return new Promise(async (resolve, reject) => {
    const capitalizedGame = game[0].toUpperCase() + game.slice(1).toLowerCase();

    const prompt = `What are some related video games to the video game The Legend of Zelda: Majora's Mask?

      The Legend of Zelda: Ocarina of Time, The Legend of Zelda: A Link to the Past, The Legend of Zelda: The Wind Waker, The Legend of Zelda: Twilight Princess, The Legend of Zelda: Skyward Sword
      
      What are some related video games to the video game Mega Man Battle Network?
      
      Mega Man Zero, Mega Man ZX, Mega Man Star Force, Mega Man Legends, Mega Man X
      
      What are some related video games to the video game ${capitalizedGame}?`;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    resolve(completion.data.choices[0].text.trim().replace(/^\s+|\s+$/g, ''));
  });
}
module.exports = generateRelatedGames;
