import mongoose from "mongoose";
import { MONGO_URI } from "../utils/config";

export const connectDB = async () => {
    if(!MONGO_URI){
        console.log('MONGO_URI must be defined in the env file'.red.underline.bold);
        process.exit(1);
    }
    try{
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected'.green.underline.bold);
    }catch(err){
        console.log(err.message.red.underline.bold);
        process.exit(1);
    }
};