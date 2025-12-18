import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import { Habilities } from "../types/habilities"
import { habilities_col } from "../utils"

type inputHab = {
    name: string,
    description: string
}

export const createHability = async (input: inputHab) => {
    const db = getDB()
    if ((await db.collection<Habilities>(habilities_col).findOne({name: input.name}))) throw new Error ("Habilidad ya creada.")
    const newHab: Habilities = {
        _id: new ObjectId,
        ...input
    }
    
    await db.collection<Habilities>(habilities_col).insertOne(newHab)
    return newHab
}