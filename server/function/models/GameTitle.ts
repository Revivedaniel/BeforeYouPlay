import mongoose, { Document, Model, Schema } from 'mongoose';

export interface GameTitleDocument extends Document {
  title: string;
  gameGenerated: boolean;
  imageName: string;
  lazyAfternoonContent: boolean;
  contentAddedDate?: Date;
  platforms: string[];
  genres: string[];
}

const gameTitleSchema: Schema = new Schema({
  title: { type: String, required: true },
  gameGenerated: { type: Boolean, required: true, default: false },
  imageName: { type: String, required: true, default: 'byp-new-game' },
  lazyAfternoonContent: { type: Boolean, required: true, default: false },
  contentAddedDate: { type: Date },
  platforms: { type: [String], required: true, default: [] },
  genres: { type: [String], required: true, default: [] },
});

const GameTitle: Model<GameTitleDocument> = mongoose.model<GameTitleDocument>(
  'GameTitle',
  gameTitleSchema
);

export { GameTitle, gameTitleSchema };
