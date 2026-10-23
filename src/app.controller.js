import { connectionDB } from "./config/database"
import { globalErrorHandler } from "./util/globalErrorHandler";

export const bootstrab = (app,express)=>{
    app.use(express.json());
    connectionDB();
    


    app.use(globalErrorHandler)
}