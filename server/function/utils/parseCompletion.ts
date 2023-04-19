export interface IParsedGame {
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
    summary: string;
}

function parseCompletion(completion: string, title: string): IParsedGame {
  if (!completion) {
    return undefined;
  }
    let start: number = completion.indexOf('{');
    let end: number = completion.lastIndexOf('}') + 1;
    let code: string = completion.slice(start, end);
    let parsed: IParsedGame | undefined;
  
    try {
      parsed = JSON.parse(code);
      parsed.summary = JSON.stringify(parsed.summary);
      parsed.title = title;
    } catch (err) {
      console.log('error parsing completion');
      console.log(code);
      console.log(err);
    }
  
  
    return parsed;
  }
  
  export default parseCompletion;
  