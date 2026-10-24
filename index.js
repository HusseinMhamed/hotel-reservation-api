import express from 'express'
import dotenv from 'dotenv'
import { bootstrab } from './src/app.js';

const app = express();
dotenv.config()

const port = process.env.PORT || 7000

bootstrab(app,express);


app.listen(port,()=>{
    console.log(`app is listening on Port ${port}`)
})
