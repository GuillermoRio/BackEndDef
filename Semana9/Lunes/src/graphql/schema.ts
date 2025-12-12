import { gql } from "apollo-server";


//La exclamacion significa que va a estar si o si
export const typeDefs = gql`
    type User {
        _id: ID!,
        email: String!,
        videoGameLibrary: [VideoGame]!

    }
    type VideoGame {
        _id: ID,
        name: String,
        date: String,
        platform: String
    }

    type Query {
        me: User
        videoGames: [VideoGame]!
        videoGame(id: ID!): VideoGame
    }

    type Mutation {
        register(email: String!, password: String!): String!
        login(email: String!, password: String!): String!
        addVideoGame(name: String!, platform: String!, date: String!): VideoGame!
        addVideoGameToMyLibrary(videoGameId: ID!): User!
        
    }

`