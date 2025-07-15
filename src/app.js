import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route.js';

const app = express();

const corsOptions = {
  origin: "*",
  headers: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', userRouter);

export default app;