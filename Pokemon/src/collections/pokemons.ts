import { getDB } from "../db/mongo"
import { attacks_col, habilities_col, pokemons_col } from "../utils"
import { Pokemons } from "../types/pokemon"
import { Habilities } from "../types/habilities"
import { Attacks } from "../types/attacks"
import { ObjectId } from "mongodb"

type inputPok = {
    name: string,
    hability: string,
    type1: string,
    type2?: string | null,
    attacks: string[]
}

export const createPok = async (input: inputPok) => {
    const db = getDB()
    if ((await db.collection<Pokemons>(pokemons_col).findOne({name: input.name}))) throw new Error ("Pokemon con ese nombre ya creadp.")
    const pokHab = await db.collection<Habilities>(habilities_col).findOne({name: input.hability})
    if (!pokHab) throw new Error(`La habilidad ${input.hability} no existe.`);   

    const pokAtts = await db.collection<Attacks>(attacks_col)
            .find({ name: { $in: input.attacks } })
            .toArray();    

    if (pokAtts.length !== input.attacks.length) throw new Error("Uno o más ataques no son válidos.");

    const newPok: Pokemons = {
        _id: new ObjectId(),
        name: input.name,
        hability: pokHab,
        type1: input.type1,
        type2: input.type2,
        attacks: pokAtts
    }
    
    await db.collection<Pokemons>(pokemons_col).insertOne(newPok)
    return newPok
}