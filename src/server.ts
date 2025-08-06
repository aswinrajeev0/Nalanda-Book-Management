import dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata";
import './container/repositoryRegistry'
import './container/serviceRegistry'
import express from 'express';
import rateLimit from "express-rate-limit";
import connectDB from './config/db';
import { AuthRoute } from "./routes/auth.route";
import { errorHandler } from "./middlewares/error.middleware";
import { HealthRoute } from "./routes/base.route";

const PORT = process.env.PORT
connectDB()

const app = express();

app.use(express.json());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}))

app.use("/health", new HealthRoute().router)
app.use("/api/auth/", new AuthRoute().router)

app.use(errorHandler)
app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})