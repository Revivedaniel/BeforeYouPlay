function generateArtists(openai, game) {
  return new Promise(async (resolve, reject) => {
    const capitalizedGame = game[0].toUpperCase() + game.slice(1).toLowerCase();

    const prompt = `Who are the Artists of the video game The Legend of Zelda: Majora's Mask?

      Eiji Aonuma, Shigeru Miyamoto, Takashi Tezuka
      
      Who are the Artists of the video game Mega Man Battle Network?
      
      Keiji Inafune, Yasuhiro Kitamura, Yoshihisa Tsuda
      
      Who are the Artists of the video game ${capitalizedGame}?`;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    resolve(completion.data.choices[0].text.trim().replace(/^\s+|\s+$/g, ''));
  });
}
module.exports = generateArtists;