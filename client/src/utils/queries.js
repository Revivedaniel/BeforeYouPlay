import { gql } from "@apollo/client";

export const QUERY_ALL_GAMES = gql`
  query games {
    games {
      _id
      title
      release_year
      genres
      cover_id
    }
  }
`;

export const QUERY_SINGLE_GAME = gql`
  query singleGame($slug: String!) {
    game(slug: $slug) {
      title
      summary
      cover_id
      release_year
      genres
      age_rating
    }
  }
`;
