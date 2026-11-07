import jwt from 'jsonwebtoken'
import { AppError } from '../util/AppError.js';
import { User } from '../models/user.js';

export const verifyJWT = async(req,res,next)=>{
    const header = req.headers.authorization;
    if(!header||!header.startsWith('Bearer')){
        throw new AppError('unauthorized',401);
    }
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const id = decoded.sub;
    const foundUser =await User.findById(id);
    if(!foundUser){
        throw new AppError('user not found',401)
    }
    if(foundUser.isActive=== false){
        throw new AppError('user is not active',401)
    }
    req.user= foundUser
    next();
}