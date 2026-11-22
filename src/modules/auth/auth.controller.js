import { Router } from "express";
import * as authService from './auth.service.js'
import { asyncHandler } from "../../util/asyncHandler.js";
import { validator } from "../../middleware/globaValidator.js";
import { loginSchema } from "../../validators/auth.validator.js";
export const authRouter = Router();

authRouter.post('/login',validator({body:loginSchema}), asyncHandler(authService.login))