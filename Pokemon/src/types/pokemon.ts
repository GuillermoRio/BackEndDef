import { Habilities } from "./habilities"
import { Attacks } from "./attacks"
import { ObjectId } from "mongodb"

    
export type Pokemons = {
    _id: ObjectId,
    name: string,
    hability: Habilities,
    type1: string,
    type2?: string | null,
    attacks: Attacks[]
}