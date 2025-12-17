import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
import { dbName } from "../utils";

dotenv.config();

let client: MongoClient;
let db: Db;

export const connectToMongoDB = async () => {
    try{
        const mongoUrl = process.env.MONGO_URL;
        client = new MongoClient(mongoUrl!);
        await client.connect();

        db = client.db(dbName);
        console.log("Estás conectado al mondongo cosa guapa!");
    }
    catch(err){
        console.log("Error del mondongo.", err)
    }
};

export const getDB = ():Db => db;


export const closeMongoDB = async () => {
    try{
        client && await client.close();
    } catch(err){
        console.log("Error cerrando el mondongo baby: ", err)
    }
}