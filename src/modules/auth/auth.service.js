import { User } from "../../models/user.js";
import { AppError } from "../../util/AppError.js";
import {env} from '../../config/env.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const login =async (req,res)=>{
    const {email , password} = req.body;
    const foundUser =await User.findOne({email}).select('+passwordHash')
    if(!foundUser || foundUser?.isActive === false){
        throw new AppError("Invalid credentials", 401);
    }
    const confirm =await bcrypt.compare(password , foundUser.passwordHash);
    if(!confirm){
        throw new AppError("Invalid credentials", 401);
    }
    const accessToken = jwt.sign({sub:foundUser._id,role:foundUser.role}, env.ACCESS_TOKEN_SECRET,{
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN
    })
    const refreshToken = jwt.sign({sub:foundUser._id,role:foundUser.role},env.REFRESH_TOKEN_SECRET,{
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly: true,
        secure: env.NODE_ENV === "production"
    });
    res.status(200).json({
        success:true,
        message:"Logged in successfully",
        data:{
            accessToken,
            tokenType:"Bearer",
            expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
            user: {id: foundUser._id, name : foundUser.name, email : foundUser.email ,role : foundUser.role}
        }
    })
}