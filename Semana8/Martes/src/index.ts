import { ApolloServer } from "apollo-server";
import { connectToMongoDB } from "./db/mongo"
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";
import { getUserFromToken } from "./auth";

dotenv.config();



const port = process.env.PORT

const start = async () => {
    await connectToMongoDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context:async ({req})=>{
            const token = req.headers.authorization || "";
            console.log("Token: " + token)
            const user = token ? await getUserFromToken(token as string): null;
            return {user}
        },
    });

    await server.listen({port: port});
    console.log("GQL sirviendo y de to");
};



start().catch(err=>console.error(err));