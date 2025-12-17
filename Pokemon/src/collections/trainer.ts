import { ObjectId } from "mongodb"
import { getDB } from "../db/mongo"
import { trainer } from "../types/trainer"
import { trainer_col, user_col } from "../utils"
import { user } from "../types/user"

export const createTrainer = async (name: string, userId: string) => {
    const db = getDB()
    const myuserId = new ObjectId(userId);
    const trainerId = new ObjectId()

    const newTrainer: trainer = {
        _id: trainerId,
        name,
        team: [],
        pc: [],
        ownwer: myuserId
    };

    await db.collection<trainer>(trainer_col).insertOne(newTrainer);

    await db.collection<user>(user_col).updateOne(
        {_id: myuserId},
        {
            $addToSet: {trainers: trainerId}
        }
    );

    return newTrainer
}

export const loginTrainer = async (name: string, userId: string) => {
    const db = getDB()
    const myuserId = new ObjectId(userId)

    const trainer = await db.collection<trainer>(trainer_col).findOne({name: name, ownwer: myuserId})
    if (!trainer) throw new Error ("No tienes creado un entrenador.")
    
    return trainer
}