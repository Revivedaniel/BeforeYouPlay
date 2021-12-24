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
