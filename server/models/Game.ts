import mongoose, { Document, Model, Schema } from 'mongoose';

interface AgeRating {
  title: string;
  rating: string;
}

const ageRatingSchema: Schema = new Schema({
  title: { type: String, required: true },
  rating: { type: String, required: true },
});

interface Credit {
  title: string;
  entries: string[];
}

const creditSchema: Schema = new Schema({
  title: { type: String, required: true },
  entries: { type: [String], required: true },
});

interface ReleaseDate {
  title: string;
  date: string;
}

const releaseDateSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
});

export interface GameDocument extends Document {
  title: string;
  platforms: string[];
  gameId: number;
  imageName: string;
  ageRatings: AgeRating[];
  releaseDates: ReleaseDate[];
  developers: string[];
  publishers: string[];
  genres: string[];
  gameModes: string[];
  series?: string;
  credits: Credit[];
  summary: string;
  relatedGames: string[];
  createdAt: Date;
}

const gameSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    platforms: {
      type: [String],
      required: true,
      default: [],
    },
    gameId: {
      type: Number,
      required: true,
    },
    imageName: {
      type: String,
      required: true,
      default: 'byp-new-game',
    },
    ageRatings: {
      type: [ageRatingSchema],
      required: true,
      default: [],
    },
    releaseDates: {
      type: [releaseDateSchema],
      required: true,
      default: [],
    },
    developers: {
      type: [String],
      required: true,
      default: [],
    },
    publishers: {
      type: [String],
      required: true,
      default: [],
    },
    genres: {
      type: [String],
      required: true,
      default: [],
    },
    gameModes: {
      type: [String],
      required: true,
      default: [],
    },
    series: String,
    credits: {
      type: [creditSchema],
      required: true,
      default: [],
    },
    summary: {
      type: String,
      required: true,
    },
    relatedGames: {
      type: [String],
      required: true,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Game: Model<GameDocument> = mongoose.model<GameDocument>('Game', gameSchema);

export { Game, gameSchema };
