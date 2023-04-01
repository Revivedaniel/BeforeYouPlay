import { gql } from "@apollo/client";

export const QUERY_ALL_GAMES = gql`
  query gamesWithCount($page: Int!) {
    games(page: $page) {
      _id
      title
      summary
      image_url
      release_year
      genres
      age_ratings
      slug
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query singleGame($title: String!) {
    video(title: $title) {
      videoUrl
    }
    game(title: $title) {
      title
      platforms
      imageName
      ageRatings {
        title
        rating
      }
      releaseDates {
        title
        date
      }
      developers
      publishers
      genres
      summary
      gameModes
      series
      relatedGames
      credits {
        title
        entries
      }
    }
  }
`;

export const QUERY_SEARCH_GAME = gql`
  query searchGame($search: String!, $page: Int!) {
    searchGame(search: $search, page: $page) {
      games {
        title
        imageName
        gameGenerated
      }
    }
  }
`;

export const QUERY_FEATURED_GAME = gql`
  query featuredGame {
    featuredGame {
      title
      imageName
    }
  }
`;

export const QUERY_ALL_PLATFORMS = gql`
  query allPlatforms {
    allPlatforms
  }
`;

export const QUERY_GAME_BY_PLATFORM = gql`
  query gamesByPlatform($platform: String!, $page: Int!) {
    gamesByPlatform(platform: $platform, page: $page) {
      games {
        title
        imageName
        gameGenerated
      }
    }
  }
`;

export const QUERY_ALL_GAME_TITLES = gql`
  query allGameTitles($page: Int!) {
    allGameTitles(page: $page) {
      games {
        title
        imageName
        gameGenerated
      }
    }
  }
`;

export const QUERY_GAMES_WITH_VIDEOS = gql`
  query gamesWithVideos($page: Int!) {
    gameWithVideos(page: $page) {
      games {
        title
        imageName
        gameGenerated
        lazyAfternoonContent
        contentAddedDate
      }
    }
  }
`;
