const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Game {
    _id: ID
    title: String
    summary: String
    cover_id: String
    release_year: Int
    genres: String
    age_rating: Int
    slug: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    user: User
    users: [User]
    game: Game
    games: [Game]
  }

  # type Mutation {
  # }
`;

module.exports = typeDefs;
