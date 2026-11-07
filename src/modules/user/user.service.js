import { User } from "../../models/user.js";
import { AppError } from "../../util/AppError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

export const signIn = async(req,res)=>{
    const {email,password}=req.body;
    const foundUser =await User.findOne({email}).select('+passwordHash');
    if(!foundUser){
        throw new AppError("Invalid email or password",401);
    }
    if(foundUser.isActive==false){
        throw new AppError("user is not active",401)
    }
    const confirm =await bcrypt.compare(password,foundUser.passwordHash);
    if(!confirm){
        throw new AppError("Invalid email or password",401);
    }
    const accessToken = jwt.sign({sub:foundUser._id , role:foundUser.role},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:15*60
    });
    const refreshToken = jwt.sign({sub:foundUser._id , role:foundUser.role},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:'7d'
    })
    res.cookie('jwt',refreshToken,{
        httpOnly: true
    })
    res.status(200).json({
        success:true,
        message:"logged in successfully",
        data:{
            accessToken,
             tokenType:"Bearer",
             expiresIn:"15m",
             user:{id:foundUser._id,name:foundUser.name,email:foundUser.email,role:foundUser.role}
            }})
}