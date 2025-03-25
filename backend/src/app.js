import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(cors({
    origin: "https://nexora-3.vercel.app/",
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());
// Import Routers
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter);

app.use(errorHandler);
export {app}