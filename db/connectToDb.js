import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        let connect = await mongoose.connect(process.env.DB_URI||"mongodb+srv://b0548578782:ba78782!@nodeproject.uq0otx2.mongodb.net/")
        console.log("mongo db connected")
    }
    catch (err) {
        console.log(err);
        console.log("cannot connect to db");
        process.exit(1)
    }
}