const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Review {
    _id: ID
    username: String
    game_id: ID
    stars: Int
    review_body: String
  }

  type Game {
    _id: ID
    title: String
    summary: String
    cover_id: String
    release_year: Int
    genres: String
    age_rating: Int
    slug: String
    reviews: [Review]
  }

  type User {
    _id: ID
    username: String
    email: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    game(slug: String!): Game
    games: [Game]
    searchGame(search: String!): [Game]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addReview(game_id: ID!, stars: Int!, review_body: String!): Review
  }
`;

module.exports = typeDefs;
