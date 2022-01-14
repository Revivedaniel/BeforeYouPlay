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
        username
        stars
        review_body
      }
    }
  }
`;

export const QUERY_SEARCH_GAME = gql`
  query searchGame($search: String!) {
    searchGame(search: $search) {
      title
      release_year
      genres
      cover_id
      slug
    }
  }
`;
