import { User } from "../../models/user.js";
import { AppError } from "../../util/AppError.js";
import bcrypt from 'bcrypt'
export const signUp = async(req,res)=>{
    const {name, email,role , password} = req.body;
    const foundUser =await User.findOne({email})
    if(foundUser){
        throw new AppError("user already exist",409);
    }
    const hashedPassword =await bcrypt.hash(password,10)
    const created =await User.create({name,email,passwordHash:hashedPassword,role})
    const {_id , name:cname , email:cmail , isActive ,role:crole} = created
    res.status(201).json({success:true,message:"created",data:{id:_id, cname , cmail , isActive, crole}})
}