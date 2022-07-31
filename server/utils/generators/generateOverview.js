function generateOverview(openai, game) {
  return new Promise(async (resolve, reject) => {
    const capitalizedGame = game[0].toUpperCase() + game.slice(1).toLowerCase();

    const storyPrompt = `What is the story of the video game The Legend of Zelda: Majora's Mask?

    Link, the main character, is on a quest to save the land of Termina from being destroyed by the moon in three days. He does this by collecting the masks of the four giants who created Termina.
    
    What is the story of the video game Mega Man Battle Network?
    
    Lan and his friend MegaMan.EXE must stop the evil Dr. Wily from taking over the world's computer network.
    
    What is the story of the video game ${capitalizedGame}?`;

    const gameplayPrompt = `What is the gameplay style of the video game Mega Man Battle Network?

    The gameplay style is a real-time action role-playing game.
    
    What is the gameplay style of the video game The Legend of Zelda: Majora's Mask?
    
    The gameplay style is an action-adventure game with puzzle and stealth elements.
    
    What is the gameplay style of the video game ${capitalizedGame}?`;

    const mainCharactersPrompt = `Who are the main characters in the video game The Legend of Zelda: Majora's Mask?

    The main characters in the game are Link, the Skull Kid, and Tingle.
    
    Who are the main characters in the video game Mega Man Battle Network?
    
    The main characters in the game are Mega Man, Lan, and Mayl.
    
    Who are the main characters in the video game ${capitalizedGame}?`;

    const settingPrompt = `What is the setting for the video game The Legend of Zelda: Majora's Mask?

    The game is set in the land of Termina.
    
    What is the setting for the video game Mega Man Battle Network?
    
    The game is set in the year 200X.
    
    What is the setting for the video game ${capitalizedGame}?`;

    const musicPrompt = `What is the music like in the video game Donkey Kong Country?

    The music is upbeat and energetic. It features a lot of percussion and brass instruments, and has a very catchy melody.
    
    What is the music like in the video game Dark Souls?
    
    The music is dark and foreboding, with a heavy emphasis on percussion and strings. The music is designed to create a sense of unease and foreboding in the player, and to heighten the sense of danger in the game.
    
    What is the music like in the video game ${capitalizedGame}?`;

    const legacyPrompt = `What is the legacy of the video game The Legend of Zelda: Majora's Mask?

    The Legend of Zelda: Majora's Mask is considered one of the best games in the Zelda series. It is known for its unique gameplay, dark atmosphere, and interesting characters.
    
    What is the legacy of the video game Mega Man Battle Network?
    
    The legacy of the video game Mega Man Battle Network is that it is a beloved game by many people. It has spawned numerous sequels and spin-offs, and has been praised for its unique gameplay and interesting story.
    
    What is the legacy of the video game ${capitalizedGame}?`;

    const storyCompletion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: storyPrompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    const gameplayCompletion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: gameplayPrompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    const mainCharactersCompletion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: mainCharactersPrompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    const settingCompletion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: settingPrompt,
      temperature: 0.6,
      max_tokens: 2048,
    });

    const musicCompletion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: musicPrompt,
      temperature: 0.3,
      max_tokens: 3500,
    });

    const legacyCompletion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: legacyPrompt,
      temperature: 0.3,
      max_tokens: 3500,
    });

    const overview = `${storyCompletion.data.choices[0].text.trim()} ${gameplayCompletion.data.choices[0].text.trim()} ${mainCharactersCompletion.data.choices[0].text.trim()} ${settingCompletion.data.choices[0].text.trim()} ${musicCompletion.data.choices[0].text.trim()} ${legacyCompletion.data.choices[0].text.trim()}`;

    resolve(overview);
  });
}
module.exports = generateOverview;
