import express, { Express } from 'express';
import router from './Routes';

const app: Express = express();

app.use(express.json());
app.use(router);

app.listen(3001, () => console.log('server is running at http://localhost:3001'));