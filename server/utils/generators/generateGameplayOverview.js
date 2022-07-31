function generateGameplayOverview(openai, game) {
  return new Promise(async (resolve, reject) => {
    const capitalizedGame = game[0].toUpperCase() + game.slice(1).toLowerCase();

    const prompt = `Generate an overview of the gameplay mechanics in the video game Mega Man Battle Network.

      In the video game Mega Man Battle Network, the player controls the character Mega Man, who must battle against computer viruses and other enemies. The player does this by using a variety of tools and weapons, which are all controlled via a menu system.
      
      Generate an overview of the gameplay mechanics in the video game The Legend of Zelda: Majora's Mask.
      
      In the video game The Legend of Zelda: Majora's Mask, the player controls the character Link, who must stop the evil Skull Kid from causing the moon to crash down onto the earth. The player does this by collecting items, solving puzzles, and defeating enemies.
      
      Generate an overview of the gameplay mechanics in the video game ${capitalizedGame}.`;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    resolve(completion.data.choices[0].text.trim().replace(/^\s+|\s+$/g, ''));
  });
}
module.exports = generateGameplayOverview;
