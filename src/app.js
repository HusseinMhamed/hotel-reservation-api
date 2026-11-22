import { connectionDB } from "./config/database.js"
import { userRouter } from "./modules/user/user.controller.js";
import { globalErrorHandler } from "./util/globalErrorHandler.js";
import { authRouter } from "./modules/auth/auth.controller.js";
import cookieParser from "cookie-parser";
export const bootstrab =async (app,express)=>{
    app.use(express.json());
    await connectionDB();
    app.use(cookieParser())
    // app.use('/user',userRouter)
    app.use('/api/v1/auth',authRouter);

    app.use(globalErrorHandler)
}