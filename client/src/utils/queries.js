import { gql } from "@apollo/client";

export const QUERY_ALL_GAMES = gql`
  query gamesWithCount($page: Int!, $perPage: Int!) {
    games(page: $page, perPage: $perPage) {
      games {
        _id
        title
        summary
        image_url
        release_year
        genres
        age_ratings
        slug
      }
      count
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query singleGame($slug: String!, $title: String!) {
    game(slug: $slug, title: $title) {
      _id
      title
      summary
      image_url
      release_year
      genres
      age_ratings
      slug
      reviews {
        _id
        username
        stars
      }
      custom_datapoints
      platforms
      lazy_afternoon_videos
      lazy_afternoon_review
      vgm_link
    }
  }
`;

export const QUERY_SEARCH_GAME = gql`
  query searchGame($search: String!, $page: Int!) {
    searchGame(search: $search, page: $page) {
      games {
        title
        release_year
        summary
        age_ratings
        image
        slug
      }
      count
    }
  }
`;
