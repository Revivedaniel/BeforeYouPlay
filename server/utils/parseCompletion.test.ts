import parseCompletion, { IParsedGame } from "./parseCompletion";

describe("parseCompletion", () => {
  it("should parse a completion string and return an IParsedGame object with a valid summary field", () => {
    const completion = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. {
        "title": "Ski",
        "platforms": [
            "Atari 2600",
            "Atari 8-bit",
            "Commodore 64",
            "Intellivision",
            "VIC-20",
            "ZX Spectrum"
        ],
        "ageRatings": [
            {
                "title": "NA",
                "rating": "E"
            },
            {
                "title": "JP",
                "rating": "All Ages"
            }
        ],
        "releaseDates": [
            {
                "title": "NA",
                "date": "1980-01-01"
            },
            {
                "title": "JP",
                "date": "1983-04-01"
            },
            {
                "title": "EU",
                "date": "1984-01-01"
            }
        ],
        "developers": [
            "Activision"
        ],
        "publishers": [
            "Activision"
        ],
        "genres": [
            "Sports"
        ],
        "gameModes": [
            "Singleplayer"
        ],
        "series": "Ski",
        "relatedGames": [
            "Slalom",
            "Winter Olympics: Lillehammer '94"
        ],
        "summary": {
            "Gameplay Mechanics": "Ski is a sports game where the player takes control of a skier and must navigate a downhill slalom course while avoiding obstacles and collecting flags for points.",
            "Difficulty": "The game is easy to learn but difficult to master, with later levels providing a significant challenge.",
            "Story and Characters": "There is no story or character development in Ski.",
            "Graphics and Art Style": "The graphics are fairly basic due to the limitations of the game's platforms, but the skier and course are still recognizable and the game runs smoothly.",
            "Music and Sound Design": "The game's sound effects are minimal and mainly consist of the skier swishing down the slope and hitting obstacles.",
            "Replayability": "Ski is a simple and addictive game, and players can compete to beat their high scores or try to master the later levels.",
            "Conclusion": "Despite its simplicity and dated graphics, Ski remains a fun and challenging game that is still enjoyable to play today."
        }
    }`;
    const expected: IParsedGame = {
      title: "Ski",
      platforms: [
        "Atari 2600",
        "Atari 8-bit",
        "Commodore 64",
        "Intellivision",
        "VIC-20",
        "ZX Spectrum",
      ],
      ageRatings: [
        {
          title: "NA",
          rating: "E",
        },
        {
          title: "JP",
          rating: "All Ages",
        },
      ],
      releaseDates: [
        {
          title: "NA",
          date: "1980-01-01",
        },
        {
          title: "JP",
          date: "1983-04-01",
        },
        {
          title: "EU",
          date: "1984-01-01",
        },
      ],
      developers: ["Activision"],
      publishers: ["Activision"],
      genres: ["Sports"],
      gameModes: ["Singleplayer"],
      series: "Ski",
      summary:
        '{"Gameplay Mechanics":"Ski is a sports game where the player takes control of a skier and must navigate a downhill slalom course while avoiding obstacles and collecting flags for points.","Difficulty":"The game is easy to learn but difficult to master, with later levels providing a significant challenge.","Story and Characters":"There is no story or character development in Ski.","Graphics and Art Style":"The graphics are fairly basic due to the limitations of the game\'s platforms, but the skier and course are still recognizable and the game runs smoothly.","Music and Sound Design":"The game\'s sound effects are minimal and mainly consist of the skier swishing down the slope and hitting obstacles.","Replayability":"Ski is a simple and addictive game, and players can compete to beat their high scores or try to master the later levels.","Conclusion":"Despite its simplicity and dated graphics, Ski remains a fun and challenging game that is still enjoyable to play today."}',
      relatedGames: ["Slalom", "Winter Olympics: Lillehammer '94"],
    };

    const result = parseCompletion(completion, "Ski");

    expect(result).toEqual(expected);
  });

  it("should handle empty string input", () => {
    const completionString = "";
    const expected: IParsedGame = undefined;

    expect(parseCompletion(completionString, "Ski")).toEqual(expected);
  });

  it("should handle invalid JSON input", () => {
    const completionString = '{ "title": "Super Mario World", }';
    const expected: IParsedGame = undefined;

    expect(parseCompletion(completionString, "Super Mario World")).toEqual(expected);
  });

  it("should handle undefined input", () => {
    const completionString: undefined = undefined;
    const expected: IParsedGame = undefined;

    expect(parseCompletion(completionString, "")).toEqual(expected);
  });

  it("should handle null input", () => {
    const completionString: null = null;
    const expected: IParsedGame = undefined;

    expect(parseCompletion(completionString, "")).toEqual(expected);
  });
});
const asd = {
  title: "Ski",
  platforms: [
    "Atari 2600",
    "Atari 8-bit",
    "Commodore 64",
    "Intellivision",
    "VIC-20",
    "ZX Spectrum",
  ],
  ageRatings: [
    { title: "NA", rating: "E" },
    { title: "JP", rating: "All Ages" },
  ],
  releaseDates: [
    { title: "NA", date: "1980-01-01" },
    { title: "JP", date: "1983-04-01" },
    { title: "EU", date: "1984-01-01" },
  ],
  developers: ["Activision"],
  publishers: ["Activision"],
  genres: ["Sports"],
  gameModes: ["Singleplayer"],
  series: "Ski",
  relatedGames: ["Slalom", "Winter Olympics: Lillehammer '94"],
  summary: {
    "Gameplay Mechanics":
      "Ski is a sports game where the player takes control of a skier and must navigate a downhill slalom course while avoiding obstacles and collecting flags for points.",
    Difficulty:
      "The game is easy to learn but difficult to master, with later levels providing a significant challenge.",
    "Story and Characters":
      "There is no story or character development in Ski.",
    "Graphics and Art Style":
      "The graphics are fairly basic due to the limitations of the game's platforms, but the skier and course are still recognizable and the game runs smoothly.",
    "Music and Sound Design":
      "The game's sound effects are minimal and mainly consist of the skier swishing down the slope and hitting obstacles.",
    Replayability:
      "Ski is a simple and addictive game, and players can compete to beat their high scores or try to master the later levels.",
    Conclusion:
      "Despite its simplicity and dated graphics, Ski remains a fun and challenging game that is still enjoyable to play today.",
  },
};
