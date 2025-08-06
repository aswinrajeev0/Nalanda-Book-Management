import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();
const PORT = process.env.PORT
connectDB()

const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})