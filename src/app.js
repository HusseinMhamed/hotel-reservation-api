import { connectionDB } from "./config/database.js"
import { globalErrorHandler } from "./util/globalErrorHandler.js";

export const bootstrab = (app,express)=>{
    app.use(express.json());
    connectionDB();



    app.use(globalErrorHandler)
}