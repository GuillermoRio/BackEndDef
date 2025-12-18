import { ObjectId } from "mongodb"
import { getDB } from "../db/mongo"
import { attacks_col } from "../utils"
import { Attacks } from "../types/attacks"

type inputAtt = {
    name: string,
    power: string,
    type: string,
    pp: string
}

export const createAttack = async (input: inputAtt) => {
    const db = getDB()
    const newAtt: Attacks = {
        _id: new ObjectId,
        ...input
    }
    if ((await db.collection<Attacks>(attacks_col).findOne({name: input.name}))) throw new Error ("Habilidad con ese nombre ya creada.")
    
    await db.collection<Attacks>(attacks_col).insertOne(newAtt)
    return newAtt
}