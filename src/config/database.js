import mongoose from "mongoose";

export const connectionDB = async ()=>{
    try{
        await mongoose.connect(process.env.CONNECT_DATABASE);
        console.log("Database is connected successfully");
    }catch(err){
        console.log(err)
    }
}