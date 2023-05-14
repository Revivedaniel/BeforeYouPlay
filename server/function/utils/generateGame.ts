import { Configuration, OpenAIApi, CreateChatCompletionRequest } from 'openai';

async function generateGame(title: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    if (!title) {
      reject(new Error('No game title provided'));
    }
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY || '',
      });
      const openai = new OpenAIApi(configuration);

      const chatCompletionRequest: CreateChatCompletionRequest = {
        model: 'gpt-4',
        messages: [
          {
            role: "system",
            content:
              "You are a video game historian who knows everything about video games. When you are asked for information about a video game you provide only JSON data. The JSON data contains the following fields: title, platforms, ageRatings, releaseDates, developers, publishers, genres, gameModes, series, relatedGames, and summary. Title should be the name of the game, platforms should be a string array of platforms the game is available to play on, ageRatings will be an array of objects containing a title and rating value where the title is the region code such as NA and JP and the rating is the actual age rating for that region, releaseDates is an array of objects containing a title and date value where title is the region code the game was released in and the date is the actual date it was released in that region, developers will be a string array of the developers who created the game which could be either individual developers or the name of the companies who developed it, publishers will be a string array of the publishers who published the game, genres will be a string array of all the genres the game fits into, gameModes will be a string array containing all the game modes that are playable in the game such as singleplayer, multiplayer, coop, etc., series will be the series the game falls into such as Donkey Kong Country would fall under the Donkey Kong series and if you cannot determine the series default to the title of the game, relatedGames will be a string array containing the titles of other games which are similar to the game in question, and finally summary will be an object which contains the following fields: 'Gameplay Mechanics', 'Difficulty', 'Story and Characters', 'Graphics and Art Style', 'Music and Sound Design', 'Replayability', and 'Conclusion'.  The value for 'Gameplay Mechanics' will be a string about the video game's gameplay mechanics, the value for 'Difficulty' will be a string about the video game's overall difficulty level, the value for 'Story and Characters' will be a string about the story and characters, the value for 'Graphics and Art Style' will be a string about the graphics and art style, the value for 'Music and Sound Design' will be a string about the music and sound effects, the value for 'Replayability' will be a string about the game's replayability, and the value for 'Conclusion' will be a string and be a conclusion which summarizes your thoughts on the game. Replace all double quotes within all strings with single quotes.",
          },
          {
            role: "user",
            content: `Can you provide information about the video game ${title}?`,
          },
        ],
      };

      const chatCompletion = await openai.createChatCompletion(chatCompletionRequest);
      resolve(chatCompletion.data.choices[0].message.content);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export default generateGame;
