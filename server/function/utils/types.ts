interface Spec {
  title: string;
  value: string;
}

interface SpecCategory {
  category: string;
  data: Spec[];
}

interface ReleaseDate {
  title: string;
  date: string;
}

interface LaunchPrice {
  title: string;
  price: string;
}

export interface PlatformDoc {
  name: string;
  type:
    | "Console"
    | "Handheld"
    | "Mobile Phone"
    | "Computer"
    | "Arcade"
    | "Software"
    | "Console & Handheld"
    | "Other";
  platformId: number;
  company: string;
  releaseDates: ReleaseDate[];
  launchPrices: LaunchPrice[];
  unitsSold: number;
  specs: SpecCategory[];
  gamesReleased: number;
  createdAt: Date;
}
