import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import gameRouter from './routes/gameRoutes';

const app = express();

app.use(
    morgan(':method :url :status :res[content-length] in :response-time ms'),
);

app.use(cors());
app.use(express.json());

app.use('/game', gameRouter);

app.use('/health', (_req: express.Request, res: express.Response) => {
    res.status(200).send("I'm alive :)");
});

export default app;
