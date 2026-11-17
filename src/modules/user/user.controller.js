import { validator } from "../../middleware/globaValidator.js";
import { UserSignUpSchema } from "../../validators/user.js";
import { Router } from "express";
import * as userService from "./user.service.js";
import { asyncHandler } from "../../util/asyncHandler.js";

export const userRouter = Router();

userRouter.post('/create',validator({body:UserSignUpSchema}),asyncHandler(userService.signUp))