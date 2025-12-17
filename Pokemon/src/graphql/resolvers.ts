import { IResolvers } from "@graphql-tools/utils";
import { getDB } from "../db/mongo";
import { createUser, validateUser } from "../collections/users";
import { signToken } from "../auth";
import { createTrainer, loginTrainer } from "../collections/trainer";


const db = getDB()

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
        }
    },
    Query: {
        me: async (_, __, { user }) => {
            if (!user) return null;
            return {
                _id: user._id.toString(),
                email: user.email,
            };
        },
        status: () => 'Servidor GraphQL funcionando correctamente.',
    },
};
