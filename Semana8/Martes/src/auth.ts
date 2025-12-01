import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { getDB } from "./db/mongo";
import { ObjectId } from "mongodb";


//ESTO ES TOTALMENTE ESTANDAR SIEMPRE IGUAL POR ESO LO SEPARAMOS

dotenv.config();
const secret = process.env.SECRET

type TokenPayload = {
    userId: string
}

export const signToken = (userId: string) => jwt.sign({userId}, secret!, {expiresIn: "1h"});//El ! es confia en mi

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, secret!) as TokenPayload
    }catch(err){
        return null;
    }
}

export const getUserFromToken = async (token: string) => {
    const payload = verifyToken(token)
    if(!payload) return null;
    const db = getDB();
    return await db.collection("usersVideoGames").findOne({
        _id: new ObjectId(payload.userId)
    })
}
