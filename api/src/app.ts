import express, { Express } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import actsRouter from './routes/acts';

config({ path: './config.env' });

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/acts', actsRouter);

export {app};
