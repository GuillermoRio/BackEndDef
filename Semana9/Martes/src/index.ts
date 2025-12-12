import { ApolloServer } from "apollo-server";
import { connectToMongoDB } from "./db/mongo"
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import dotenv from "dotenv";
import { getUserFromToken } from "./auth";

dotenv.config();



const PORT = process.env.PORT

const start = async () => {
    await connectToMongoDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context:async ({req})=>{
            const token = req.headers.authorization || "";
            const user = token ? await getUserFromToken(token): null;
            return {user}
        },
    });

    await server.listen({port: PORT});
    console.log("GQL sirviendo y de to");
};



start().catch(err=>console.log('Error en run ', err));