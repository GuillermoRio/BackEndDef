import { ObjectId } from "mongodb"

    
export type Attacks = {
    _id: ObjectId,
    name: string,
    power: string,
    type: string,
    pp: string
}