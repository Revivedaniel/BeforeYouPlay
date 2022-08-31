function filterTitle(title) {
    // change the obscured title to the actual title
    switch (title) {
        case "game title":
          title = "title";
          break;
        case "sum":
          title = "summary";
          break;
        case "cover":
          title = "image_url";
          break;
        case "release":
          title = "release_year";
          break;
        case "gen":
          title = "genres";
          break;
        case "ages":
          title = "age_ratings";
          break;
        case "dev":
          title = "developer";
          break;
        case "dir":
          title = "directors";
          break;
        case "prod":
          title = "producers";
          break;
        case "des":
          title = "designers";
          break;
        case "prog":
          title = "programmers";
          break;
        case "art":
          title = "artists";
          break;
        case "comp":
          title = "composers";
          break;
        case "pub":
          title = "publishers";
          break;
        case "gameM":
          title = "game_modes";
          break;
        case "beat":
          title = "timeToBeat";
          break;
        case "them":
          title = "themes";
          break;
        case "gameP":
          title = "gameplay";
          break;
        case "rel":
          title = "release_dates";
          break;
        default:
            title = "";
            break;
      }
      return title;
}

module.exports = filterTitle;