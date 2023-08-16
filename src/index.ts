import express, { Express } from 'express';
import router from './Routes';
import Cors from './middlewares/cors';

const app: Express = express();

app.use(express.json());
app.use(Cors)
app.use(router);

app.listen(3001, () => console.log('server is running at http://localhost:3001'));