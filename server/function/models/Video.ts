import mongoose, { Document, Model, Schema } from 'mongoose';

export interface VideoDocument extends Document {
  type: string;
  gameTitle: string;
  videoUrl: string;
  dateAdded: Date;
}

const videoSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  gameTitle: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Video: Model<VideoDocument> = mongoose.model<VideoDocument>('Video', videoSchema);

export default Video;
