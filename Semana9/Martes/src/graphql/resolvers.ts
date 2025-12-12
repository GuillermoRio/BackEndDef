import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import { createUser, validateUser } from "../collections/user";
import { buyClothe, createClothe, getCloth, getClothesfromID } from "../collections/clothe";

//AUTH; INDEX; MONGO ; USERSVIDEOGAMES
const nameCollection = "VideoGames";

export const resolvers:IResolvers = {
    Query: {
        clothes: async (_, {page, size}) => {
            return await getCloth(page,size)
        },
        clothing: async (_, {id}) => {

        },
        me: async (_,__, {user}) => {
            if(!user) throw new Error('Login incorrecto')
            return {
                _id: user._id
            }
        }
    },
    User: {
        clothes: async (parent) => {
            const db = getDB()
            return await getClothesfromID(parent.clothes)
        }
    },
    Mutations: {
        register: async(_, {email, password}) => {
            const id = await createUser(email,password);

            return signToken(id)
        },
        login: async (_, {email, password}) => {
            const user = await validateUser(email,password)
            if(!user) throw new Error('Login incorrecto.');
            return signToken(user._id.toString())
        },
        addClothing: async (_, {name, size, color, price}, {user}) => {
            if (!user) throw new Error
            const result = await createClothe(name, size, color, price)
            return result
        },
        buyClothing: async (_, {clotheID}, {user}) => {
            if (!user) throw new Error
            return await buyClothe(clotheID, user._id)
        },
    },

}


//GraphQL, encadenados, paginacion, eschema nos da y anotaciones al lado de cada funcion, variables env hay que pasarlas , y erramienta de test automatizado que ejecuta codigo