import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { getDB } from "./db/mongo";
import { ObjectId } from "mongodb";
import { user_col } from "./utils";
import { user } from "./types/user";


//ESTO ES TOTALMENTE ESTANDAR SIEMPRE IGUAL POR ESO LO SEPARAMOS

dotenv.config();
const SECRET = process.env.SECRET

type TokenPayload = {
    userId: string
}

export const signToken = (userId: string) => jwt.sign({userId}, SECRET!, {expiresIn: "1h"});//El ! es confia en mi

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        if(!SECRET) throw new Error("SECRET is not defined in environment variables");
        return jwt.verify(token, SECRET!) as TokenPayload
    }catch(err){
        return null;
    }
}

export const getUserFromToken = async (token: string) => {
    const payload = verifyToken(token)
    if(!payload) return null;
    const db = getDB();
    return await db.collection<user>(user_col).findOne({
        _id: new ObjectId(payload.userId)
    })
}
