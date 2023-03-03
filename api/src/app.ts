import express, { Express } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import actsRouter from './routes/acts';
import usersRouter from './routes/users';
import tokensRouter from './routes/users';

config({ path: './config.env' });

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/acts', actsRouter);
app.use('/users', usersRouter);
app.use('/tokens', tokensRouter);

export {app};
