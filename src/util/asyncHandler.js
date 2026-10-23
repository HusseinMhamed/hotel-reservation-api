
export const asyncHandler = (func)=>{
    return async (req ,res , next)=>{
        try{
            func(req,res,next)
        }catch(err){
            next(err);
        }
    }
}