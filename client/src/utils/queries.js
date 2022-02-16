import { gql } from "@apollo/client";

export const QUERY_ALL_GAMES = gql`
  query gamesWithCount($page: Int!, $perPage: Int!) {
    games(page: $page, perPage: $perPage) {
      games {
        _id
        title
        summary
        cover_id
        release_year
        genres
        age_rating
        slug
      }
      count
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query singleGame($slug: String!) {
    game(slug: $slug) {
      _id
      title
      summary
      cover_id
      release_year
      genres
      age_rating
      reviews {
        _id
        title
        username
        stars
        review_body
      }
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
        age_rating
        genres
        cover_id
        slug
      }
      count
    }
  }
`;
