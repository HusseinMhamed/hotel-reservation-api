import express from 'express'
import { bootstrab } from './src/app.js';
import { env } from './src/config/env.js';
const app = express();

const port = env.PORT || 7000

bootstrab(app,express);


app.listen(port,()=>{
    console.log(`app is listening on Port ${port}`)
})
