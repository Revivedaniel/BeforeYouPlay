function generateAgeRatings(openai, game) {
  return new Promise(async (resolve, reject) => {
    const capitalizedGame = game[0].toUpperCase() + game.slice(1).toLowerCase();

    const ESRBPrompt = `What is the Entertainment Software Rating Board's rating for the video game The Legend of Zelda: Majora's Mask?

      E10+
      
      What is the Entertainment Software Rating Board's rating for the video game Mega Man Battle Network?
      
      E
      
      What is the Entertainment Software Rating Board's rating for the video game ${capitalizedGame}?`;

    const PEGIPrompt = `What is the Pan European Game Information's rating for the video game The Legend of Zelda: Majora's Mask?

      12+
      
      What is the Pan European Game Information's rating for the video game Mega Man Battle Network?
      
      7+
      
      What is the Pan European Game Information's rating for the video game ${capitalizedGame}?`;

    const CEROPrompt = `What is the Computer Entertainment Rating Organization's rating for the video game The Legend of Zelda: Majora's Mask?

      A
      
      What is the Computer Entertainment Rating Organization's rating for the video game Dark Souls?
      
      D
      
      What is the Computer Entertainment Rating Organization's rating for the video game ${capitalizedGame}?`;

    const ESRBCompletion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: ESRBPrompt,
      temperature: 0,
      max_tokens: 2048,
    });

    const PEGICompletion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: PEGIPrompt,
      temperature: 0,
      max_tokens: 2048,
    });

    const CEROCompletion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: CEROPrompt,
      temperature: 0,
      max_tokens: 2048,
    });

    const stringifiedAgeRatings = JSON.stringify({
      ESRB: ESRBCompletion.data.choices[0].text.trim().replace(/^\s+|\s+$/g, ''),
      PEGI: PEGICompletion.data.choices[0].text.trim().replace(/^\s+|\s+$/g, ''),
      CERO: CEROCompletion.data.choices[0].text.trim().replace(/^\s+|\s+$/g, ''),
    });

    resolve(stringifiedAgeRatings);
  });
}
module.exports = generateAgeRatings;
