import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'colors';
import dotenv from 'dotenv';
import { connectDB, AuthRouter } from './src/helpers/path';

dotenv.config();

connectDB(); // Connect our database

let app = express();

app.use(cors());

app.use(express.json());

let limit = rateLimit({
    windowMs: 10 * 60 * 1000, //10min
    max: 100 //100 request per min
});

app.use(limit);

app.use('/api/v1/auth', AuthRouter);

let PORT = process.env.PORt || 8000;

app.listen(PORT, () => {
    console.log(`We are running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

