import { get } from "http"
import { getDB } from "../db/mongo"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"

const COLLECTION = "usersVideoGames"

export const crearUser = async (email: string, password: string) => {
    const db = getDB()
    const toEncriptao = await bcrypt.hash(password, 10)

    const result = await db.collection(COLLECTION).insertOne({
        email,
        password: toEncriptao
    })

    return result.insertedId.toString()
}


export const validateUser = async (email: string, password: string) => {
    const db = getDB();
    const user = await db.collection(COLLECTION).findOne({email});
    if( !user ) return null;

    const laPassEsLaMismaMismita = await bcrypt.compare(password, user.password);//Ver si es la misma contra o no
    if(!laPassEsLaMismaMismita) return null;

    return user;//Solo devuelve user si es correcto
}

export const findUserbyId = async (id: string) => {
    const db = getDB()
    return await db.collection(COLLECTION).findOne({_id: new ObjectId(id)})
}