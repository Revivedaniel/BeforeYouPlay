const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Review {
    _id: ID
    username: String
    game_id: ID
    stars: Int
  }

  type Game {
    _id: ID
    title: String
    summary: String
    image_url: String
    release_year: String
    genres: String
    age_ratings: String
    slug: String
    reviews: [Review]
    custom_datapoints: String
    platforms: String
    lazy_afternoon_videos: String
    lazy_afternoon_review: String
    vgm_link: String
  }

  type FreshData {
    _id: ID
    game_id: ID
    created_at: String
    up_votes: Int
    down_votes: Int
    potentially_outdated: Boolean
    data: String
    data_title: String
    admin_approvals: Int
    votes_total: Int
    manually_typed: Boolean
  }

  type GameSearchResults {
    title: String
    summary: String
    image: String
    release_year: String
    age_ratings: String
    slug: String
  }

  type Games {
    games: [Game]
    count: Int
  }

  type Search {
    games: [GameSearchResults]
    count: Int
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
    game(slug: String!, title: String!): Game
    games(page: Int!, perPage: Int!): Games
    searchGame(search: String!, page: Int!): Search
    getDataPointsByRating: [FreshData]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addReview(game_id: ID!, stars: Int!): Review
    rateDataPoint(slug: String!, title: String!, vote: Int!): FreshData
    updateDataPoint(slug: String!, title: String!, update: String!, dataType: String!): FreshData
    deleteDataPoint(slug: String!, title: String!, dataType: String!): FreshData
  }
`;

module.exports = typeDefs;
