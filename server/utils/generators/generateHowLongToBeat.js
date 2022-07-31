function generateHowLongToBeat(openai, game) {
  return new Promise(async (resolve, reject) => {
    const capitalizedGame = game[0].toUpperCase() + game.slice(1).toLowerCase();

    const prompt = `On average, how long does the video game The Legend of Zelda: Majora's Mask take to beat?

      20 hours.
      
      On average, how long does the video game Mega Man Battle Network?
      
      10 hours
      
      On average, how long does the video game ${capitalizedGame}?
      `;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    resolve(completion.data.choices[0].text.trim().replace(/^\s+|\s+$/g, ''));
  });
}
module.exports = generateHowLongToBeat;
