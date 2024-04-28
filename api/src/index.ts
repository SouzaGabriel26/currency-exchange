import express, { Express } from 'express';
import { Server } from 'socket.io';
import router from './Routes';
import Cors from './middlewares/cors';
import { websocket } from './websocket/sendUpdatedValues';

const app: Express = express();

app.use(express.json());
app.use(Cors)
app.use(router);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`));

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
});

io.on('connection', async (socket) => {
  websocket.sendUpdatedValues({ socket });
});




