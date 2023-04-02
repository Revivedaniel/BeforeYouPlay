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

export interface Game {
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
