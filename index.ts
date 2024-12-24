import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'colors';
import dotenv from 'dotenv';

dotenv.config();

let app = express();

app.use(cors());

app.use(express.json());

let limit = rateLimit({
    windowMs: 10 * 60 * 1000, //10min
    max: 100 //100 request per min
});

app.use(limit);

let PORT = process.env.PORt || 8000;

app.listen(PORT, () => {
    console.log(`We are running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

