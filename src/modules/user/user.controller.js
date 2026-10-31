import { validator } from "../../middleware/globaValidator.js";
import { createUserSchema } from "../../validators/user.js";
import { Router } from "express";
import * as userService from "./user.service.js";
import { asyncHandler } from "../../util/asyncHandler.js";

export const userRouter = Router();

userRouter.post('/create',validator({body:createUserSchema}),asyncHandler(userService.createUser))