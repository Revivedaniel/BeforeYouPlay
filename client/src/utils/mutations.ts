import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!, $email: String!, $password: String!) {
    updateUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($game_id: ID!, $stars: Int!) {
    addReview(game_id: $game_id, stars: $stars) {
      _id
      username
      game_id
      stars
    }
  }
`;

export const RATE_DATAPOINT = gql`
  mutation rateDataPoint($slug: String!, $title: String!, $vote: Int!) {
    rateDataPoint(slug: $slug, title: $title, vote: $vote) {
      up_votes
      down_votes
      votes_total
    }
  }
`;
