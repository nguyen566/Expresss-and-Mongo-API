import mongoose from "mongoose";
import { ProjectType } from "../types/projectTypes";
import { MONGO_URI } from "../utils/config";
import HttpException from "../utils/httpExpcetion";

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

export function validateObjectId(id: string){
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new HttpException(`${id} is not a valid Id`, 400);
    }
}

export function validateObjectProperties(properties: ProjectType, callback?: void){
    if(!properties.title){
        throw new HttpException(`Title is required`, 400);
    }
}