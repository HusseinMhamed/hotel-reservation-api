import { User } from "../models/user.js";
import mongoose from "mongoose";
import { connectionDB } from "../config/database.js";
import { env } from "../config/env.js";
async function seedAdmin(){
    try{
        await connectionDB();
        const userExists =await User.findOne({email:env.SEED_ADMIN_EMAIL})
        if(userExists){
            // console.log(userExits)
            console.log("Admin already exist");
            await mongoose.disconnect();
            process.exit(0);
        }
        await User.create({name:env.SEED_ADMIN_NAME,
        email:env.SEED_ADMIN_EMAIL,
        passwordHash:env.SEED_ADMIN_PASSWORD,
        role:"admin",
        isActive:true})
            console.log("admin created successfully")
            await mongoose.disconnect();
            process.exit(0);
    }catch(err){
        console.log("seeding admin Error:", err.message);
        await mongoose.disconnect();
        process.exit(1);
    }
}

seedAdmin();