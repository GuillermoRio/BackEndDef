import { ObjectId } from "mongodb"

    
export type Habilities = {
    _id: ObjectId,
    name: string,
    description: string
}