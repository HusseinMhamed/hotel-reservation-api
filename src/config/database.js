import mongoose from "mongoose";
import { env } from "./env.js";
export const connectionDB = async ()=>{
    try{
        await mongoose.connect(env.CONNECT_DATABASE);
        console.log("Database is connected successfully");
    }catch(err){
        console.error("DB connection failed",err.message);
        process.exit(1)
    }
}