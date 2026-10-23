
export const globalErrorHandler = (err , req ,res , next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server Error"
    
    return res.status(statusCode).json({message})
}