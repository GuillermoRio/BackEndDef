import { gql } from "apollo-server"

export const typeDefs = gql`

    type User {
        _id: String!
        email: String!
        trainers: [Trainer]
    }
    type Trainer {
        _id: String!
        name: String!
        team: [ID]!
        pc: [ID]!
    }

    type Pokemons {
        _id: String!
        name: String!
        hability: ID!
        type1: String!
        type2: String
        attacks: [ID]
    }

    type Attacks {
        _id: String!
        description: String!
    }

    type Query {
        status: String
        me: User
    }
    type Mutation {
        registerUser(email: String!, password: String!): String!
        loginUser(email: String!, password: String!): String!
        registerUserTrainer(name: String!): Trainer
        loginUserTrainer(name: String!): Trainer
    }




`