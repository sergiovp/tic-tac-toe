import express from 'express';
import router from './routes/routes';
import morgan from 'morgan';

const app = express();

app.use(
    morgan(':method :url :status :res[content-length] in :response-time ms'),
);

app.use(express.json());

app.use(router);

export default app;
