
export const validator = (schema)=>{
    return (req , res , next)=>{
        let errors = []
        for( let key of ['body' , 'params' , 'query'] ){
            if(!req[key] || !schema[key] ){continue;}
            const {error , value} = schema[key].validate(req[key],{
                abortEarly: false,
                // stripUnknown: true
            })
            if(error?.details?.length>0){
                error.details.forEach(element => {
                    errors.push({
                        field:element.path.join('.'),
                        message:element.message})
                });
            }else{
                req[key]=value;
            }
        }

        if(errors.length>0){
            return res.status(400).json({success: false , message: "validator error", errors})
        }

        next();
    }
}