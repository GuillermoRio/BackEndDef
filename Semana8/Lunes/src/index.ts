import { ApolloServer } from "apollo-server";
import { connectToMongoDB } from "./db/mongo"
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";

dotenv.config();



const port = process.env.PORT

const start = async () => {
    await connectToMongoDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req})=>{
            return req;
        }
    });

    await server.listen({port: port});
    console.log("GQL sirviendo y de to");
};



start().catch(err=>console.error(err));