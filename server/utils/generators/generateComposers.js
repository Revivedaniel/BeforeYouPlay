function generateComposers(openai, game) {
  return new Promise(async (resolve, reject) => {
    const capitalizedGame = game[0].toUpperCase() + game.slice(1).toLowerCase();

    const prompt = `Who are the Composer of the video game The Legend of Zelda: Majora's Mask?

      Koji Kondo,Toru Minegishi,Hajime Wakai
      
      Who are the Composer of the video game Mega Man Battle Network?
      
      Yoshino Aoki,Yasumasa Kitagawa,Makoto Tomozawa,Kenichi Matsubara,Akari Kaida
      
      Who are the Composer of the video game ${capitalizedGame}?`;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    resolve(completion.data.choices[0].text.trim().replace(/^\s+|\s+$/g, '').split(','));
  });
}
module.exports = generateComposers;
