import { ObjectId } from "mongodb";
import { getDB } from "../db/mongo"
import { clothes_col } from "../utils";

const dB = getDB()

export const getCloth = async (page?: number, size?: number) => {
    page = page || 1;
    size = size || 10;

    return await dB.collection(clothes_col).find().skip((page - 1) * size).toArray()
}

export const getClothWithId = async (id: string) => {
    return await dB.collection(clothes_col).findOne({_id: new ObjectId(id)})
}

export const createClothe = async (name: string, size: string, color: string, price: number) => {
    const result = await dB.collection(clothes_col).insertOne({
        name,
        size,
        color,
        price
    })
    
    const newClothing = await getClothWithId(result.insertedId.toString())
    return newClothing
}

export const buyClothe = async (clotheID: string, userID: string) => {
    const clotheadd = await getClothWithId(clotheID)
    if(!clotheadd) return new Error('Cant add clothe')
    
    await dB.collection(clothes_col).updateOne({_id: new ObjectId(userID)}, {
        $addToSet: {clothes: clotheID}
    })
    const updatedUser = await dB.collection(clothes_col).findOne({_id: new ObjectId})
    return updatedUser
}

export const getClothesfromID = async (ids: Array<string>) => {
    const idsMongo = ids.map(x=>new ObjectId(x));

    return dB.collection(clothes_col).find({
        _id: {$in: idsMongo}
    }).toArray();

}