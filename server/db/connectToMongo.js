
import mongoose from "mongoose";
export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB_NAME });
        console.log("Mongo DB connected");
    } catch (e) {
        console.log("Couldn't connect with Mongo DB, error message: " + e);
    }
};