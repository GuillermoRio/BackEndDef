import bcrypt from "bcryptjs";
import { getDB } from "../db/mongo";
import { emailRegex, user_col } from "../utils";
import { ObjectId } from "mongodb";
import { user } from "../types/user";

export const createUser = async (email: string, password: string) => {
    const db = getDB()
    const encriptacion = await bcrypt.hash(password, 10)
    const emailNormalized = email.toLowerCase()

    if (!emailRegex.test(emailNormalized)) throw new Error("Email no puesto correctamente")
    const repEmail = await db.collection<user>(user_col).findOne({email: emailNormalized})
    if (repEmail) throw new Error("Email ya existente")  

    const user = await db.collection<user>(user_col).insertOne({
        _id: new ObjectId(),
        email: emailNormalized,
        password: encriptacion,
        trainers: []
    })

    return user.insertedId.toString()
}

export const validateUser = async (email: string, password: string) => {
    const db = getDB()
    const emailNormalized = email.toLowerCase()
    const user = await db.collection<user>(user_col).findOne({email: emailNormalized})
    if (!user) throw new Error("Email incorrecto")

    const passwordCorrect = await bcrypt.compare(password, user.password)
    if(!passwordCorrect) throw new Error("Contraseña incorrecta")

    return user._id.toString()
}