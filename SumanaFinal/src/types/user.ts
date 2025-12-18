import { ObjectId } from "mongodb"

export type user = {
    _id: ObjectId,
    email: string,
    password: string,
}