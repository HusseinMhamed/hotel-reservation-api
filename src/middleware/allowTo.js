import { AppError } from "../util/AppError.js"

export const allowTo =(...role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            throw new AppError('forbidden',403)
        }
        next();
    }
}