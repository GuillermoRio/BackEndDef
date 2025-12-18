import { IResolvers } from "@graphql-tools/utils";
import { getDB } from "../db/mongo";
import { createUser, validateUser } from "../collections/users";
import { signToken } from "../auth";
import { createTrainer, loginTrainer } from "../collections/trainer";
import { Habilities } from "../types/habilities";
import { habilities_col, trainer_col, user_col } from "../utils";
import { ObjectId } from "mongodb";
import { createHability } from "../collections/habilities";
import { createAttack } from "../collections/attacks";
import { createPok } from "../collections/pokemons";
import { user } from "../types/user";
import { trainer } from "../types/trainer";


export const resolvers: IResolvers = {
    Mutation : {
        registerUser: async(_,{email, password}) => {
            try {
                const trainer =  await createUser(email, password)
                return signToken(trainer)
            }catch(error){
                return error
            }
        },
        loginUser: async(_,{email, password}) => {
            try {
                const trainer =  await validateUser(email, password)
                return signToken(trainer)
            }catch(error){
                return error
            }  
        },
        registerUserTrainer: async (_, {name}, {user}) => {
            try{
                if (!user) throw new Error("No puedes crear un entrenador si no tienes cuenta.")
                const trainer = await createTrainer(name, user._id.toString())  
                return trainer
            }catch(error){
                return error
            }
        },
        loginUserTrainer: async (_, {name}, {user}) => {
            try{
                if (!user) throw new Error("No puedes elegir un entrenador si no tienes cuenta.")
                const trainer = await loginTrainer(name, user._id.toString())  
                return trainer
            }catch(error){
                return error
            }
        },
        createHability: async (_, {input}) => {
            try{
                return createHability(input)
            }catch(error){
                return error
            }
        },
        createAttack: async (_, {input}) => {
            try{
                return createAttack(input)
            }catch(error){
                return error
            }
        },
        createPokemon: async (_, {input}) => {
            try{
                return createPok(input)
            }catch(error){
                return error
            }
        }   

    },
    Query: {
        me: async (_, __, { user }) => {
            if (!user) return null;
            const db = getDB()
            const showUser: user = user
            const showTra = await db.collection<trainer>(trainer_col).find({_id: { $in: showUser.trainers} })
            .toArray(); 
            return {
                _id: showUser._id.toString(),
                email: showUser.email,
                trainers: showTra
            };
        },
        status: () => 'Servidor GraphQL funcionando correctamente.',
    },

    User: {
        trainers: async (parent: user) => {
            const db = getDB();
            const listaDeIdsDeTrainers = parent.trainers
            if(!listaDeIdsDeTrainers) return [];
            const objectIds = listaDeIdsDeTrainers.map((id) => new ObjectId(id));
            return db
                .collection<trainer>(trainer_col)
                .find({ _id: { $in: objectIds } })
                .toArray();
        }
    }
};
