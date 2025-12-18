import { ObjectId } from "mongodb"
import { getDB } from "../db/mongo"
import { ropa_col } from "../utils"

export const getClothingById = async (id: string) => {
    const db = getDB();
    return await db.collection(ropa_col).findOne({_id: new ObjectId(id)});
};

export const createClothe = async (name: string, size: string, color: string, price: number) => {
    const db = getDB()

    const result = await db.collection(ropa_col).insertOne({
        name,
        size,
        color,
        price,
    })
    const newRopa = await db.collection(ropa_col).findOne(result.insertedId)
    return newRopa
}