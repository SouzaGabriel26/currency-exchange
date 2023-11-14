import express, { Express } from 'express';
import { Server } from 'socket.io';
import router from './Routes';
import Cors from './middlewares/cors';
import { websocket } from './websocket/sendUpdatedValues';

const app: Express = express();

app.use(express.json());
app.use(Cors)
app.use(router);

const server = app.listen(3001, () => console.log('server is running at http://localhost:3001'));

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
});

let interval: NodeJS.Timeout;

io.on('connection', async (socket) => {
  websocket.sendUpdatedValues({ socket });
});




