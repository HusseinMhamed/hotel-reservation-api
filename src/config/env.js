import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development','production','test').default('development'),
    PORT: Joi.number().default(7000),
    CONNECT_DATABASE: Joi.string().required(),
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    ACCESS_TOKEN_EXPIRES_IN : Joi.string().default("15m"),
    REFRESH_TOKEN_EXPIRES_IN: Joi.string().default("7d")
}).unknown()

const {error , value} = envSchema.validate(process.env);

if(error){
    console.error("Error in environment variable:",error);
    process.exit(1)
}

export const env= value