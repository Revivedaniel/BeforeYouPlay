const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type Game {
    title: String
    platforms: [String]
    gameId: Int
    imageName: String
    ageRatings: [AgeRating]
    releaseDates: [ReleaseDate]
    developers: [String]
    publishers: [String]
    genres: [String]
    summary: String
    gameModes: [String]
    series: String
    relatedGames: [String]
    credits: [Credit]
  }

  type AgeRating {
    title: String
    rating: String
  }

  type ReleaseDate {
    title: String
    date: String
  }

  type Credit {
    title: String
    entries: String
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

  type GameTitle {
    title: String
    imageName: String
    gameGenerated: Boolean
    lazyAfternoonContent: Boolean
    contentAddedDate: String
    platforms: [String]
    genres: [String]
  }

  type Search {
    games: [GameTitle]
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

  type FeaturedGame {
    title: String
    imageName: String
  }

  type Video {
    type: String
    gameTitle: String
    videoUrl: String
    dateAdded: String
  }

  type Query {
    user: User
    game(title: String!): Game
    games(page: Int!): [Game]
    searchGame(search: String!, page: Int!): Search
    featuredGame: FeaturedGame
    gamesByPlatform(platform: String!, page: Int!): Search
    allPlatforms: [String]
    allGameTitles(page: Int!): Search
    gameWithVideos(page: Int!): Search
    video(title: String!): Video
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
