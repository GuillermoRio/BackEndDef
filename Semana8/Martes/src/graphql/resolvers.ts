import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import { IResolvers } from "@graphql-tools/utils";
import { UserVideoGame } from "../types/Users";
import { crearUser, validateUser } from "../collections/usersVideoGames";
import { signToken } from "../auth";

//AUTH; INDEX; MONGO ; USERSVIDEOGAMES
const nameCollection = "VideoGames";

export const resolvers: IResolvers = {
    Query: {
        videoGames: async () => {  
            const db = getDB();  
            return db.collection(nameCollection).find().toArray();
        },

        videoGame: async (_, {id})=>{
            const db = getDB();  
            return db.collection(nameCollection).findOne({_id: new ObjectId(id)});
        },
        me: async (_,__, context ) => {
            const user: UserVideoGame = context.user
            if(!user)return null
            return {
                _id: user._id.toString(),
                email: user.email
            }
        }
    },

    Mutation: {
        addVideoGame: async (_, {name, platform, date})=>{
            const db = getDB();//HAERLO TU EN OTRO TS
            const result = await db.collection(nameCollection).insertOne({
                name,
                platform,
                date
            });
            return {
                _id: result.insertedId,
                name,
                platform,
                date
            }
        },
        register: async (_, {email, password}: {email: string, password: string}) => {
            const userId = await crearUser(email,password)
            return signToken(userId)
        },
        login: async (_, {email, password}: {email: string, password: string}) => {
            const user = await validateUser(email,password);
            if(!user) throw new Error("Invalid credential");
            return signToken(user._id.toString())
        },
    }
}