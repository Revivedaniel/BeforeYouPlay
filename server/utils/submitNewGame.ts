import mongoose, { Connection, Model } from 'mongoose';
import { GameDocument, gameSchema } from '../models/Game.js';
import { GameTitleDocument, gameTitleSchema } from '../models/GameTitle.js';
import { IParsedGame } from './parseCompletion.js';

export interface GameInput {
  title: string;
  platforms: string[];
  ageRatings: {
    title: string;
    rating: string;
  }[];
  releaseDates: {
    title: string;
    date: string;
  }[];
  developers: string[];
  publishers: string[];
  genres: string[];
  gameModes: string[];
  series: string;
  relatedGames: string[];
  summary: {
    'Gameplay Mechanics': string;
    Difficulty: string;
    'Story and Characters': string;
    'Graphics and Art Style': string;
    'Music and Sound Design': string;
    Replayability: string;
    Conclusion: string;
  };
}

async function submitNewGame(game: IParsedGame, imageName: string): Promise<GameDocument> {
  return new Promise(async (resolve, reject) => {
    try {
      const connection: Connection = await mongoose.createConnection(process.env.VGI_API_MONGODB_URI || '');

      const Game: Model<GameDocument> = connection.model<GameDocument>('Game', gameSchema);
      const GameTitle: Model<GameTitleDocument> = connection.model<GameTitleDocument>('GameTitle', gameTitleSchema);

      const count: number = await Game.countDocuments();
      const newGame: GameDocument = await Game.create({ ...game, gameId: count + 1, imageName: imageName });

      // if the new game was created successfully,
      // update the gameTitle to gameGenerated = true
      // and add the platforms and genres to the gameTitle
      if (newGame) {
        const gameTitle: GameTitleDocument | null = await GameTitle.findOneAndUpdate(
          { title: newGame.title },
          {
            gameGenerated: true,
            platforms: newGame.platforms,
            genres: newGame.genres,
          },
          { new: true }
        );
        if (!gameTitle) {
          console.log('gameTitle not found');
        }
      } else {
        console.log('newGame not created');
        reject('newGame not created');
      }

      resolve(newGame);
      connection.close();
    } catch (error) {
      reject(error);
    }
  });
}

export default submitNewGame;
