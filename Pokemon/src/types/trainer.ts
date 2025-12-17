import { ObjectId } from "mongodb"

export type trainer = {
    _id: ObjectId,
    name: string,
    team: ObjectId[],
    pc: ObjectId[]
}