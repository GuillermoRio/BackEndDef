import { IResolvers } from "@graphql-tools/utils";
import { createUser, validateUser } from "../collections/users";
import { signToken } from "../auth";
import { createClothe } from "../collections/cloth";


export const resolvers: IResolvers = {
   Mutation: {
        addClothing: async (_, {name, size, color, price}) => {
            return createClothe(name, size, color, price)
        },
        register: async(_,{email, password}) => {
            try {
                const trainer =  await createUser(email, password)
                return signToken(trainer)
            }catch(error){
                return error
            }
        },
        login: async(_,{email, password}) => {
            try {
                const trainer =  await validateUser(email, password)
                return signToken(trainer)
            }catch(error){
                return error
            }  
        },
   }
};
