import { User } from "../../models/user.js";

export const createUser = async(req,res)=>{
    const {name, email , password} = req.body;
    const created =await User.create({name,email,passwordHash:password})
    res.status(201).json({message:"user created successfully",created})
}