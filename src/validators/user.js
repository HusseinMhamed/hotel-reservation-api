import Joi from "joi";
import { ROLES } from "../models/user.js";
import { objectId } from "./common.validator.js";
// let ROLE = [ 'manager' , 'receptionist']

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(80).required(),
    email: Joi.string().email().lowercase().required(),
    password:Joi.string().min(8).max(72).required(),
    role: Joi.string().valid(...ROLES).default('receptionist'),
    isActive: Joi.bool().default(false)
})

export const userId = Joi.object({
    userId: objectId.required()
})