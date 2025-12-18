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
        team: [Pokemons]!
        pc: [Pokemons]!
    }

    type Pokemons {
        _id: String!
        name: String!
        hability: Hability!
        type1: String!
        type2: String
        attacks: [Attack]
    }

    type Attack {
        _id: String!
        name: String!
        power: String!
        type: String!
        pp: String!
    }

    type Hability {
        name: String!
        description: String!
    }

    input PokemonInput {
        name: String!
        hability: String!
        type1: String!
        type2: String
        attacks: [String]!
    }
    input HabilityInput {
        name: String!
        description: String!
    }

    input AttackInput {
        name: String!
        power: String!
        type: String!
        pp: String!
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
        createHability(input: HabilityInput): Hability!
        createAttack(input: AttackInput): Attack!
        createPokemon(input: PokemonInput): Pokemons!
    }
`