import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { getGBPinUSD, getUSDinGBP } from "../utils/getBidValue";

interface IsendUpdatedValuesProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

let interval: NodeJS.Timeout;

function sendUpdatedValues({ socket }: IsendUpdatedValuesProps) {
  socket.on('firstValue', async (data: {type: string, username: string}) => {
    if (data.type === 'login') {

        await emitUpdatedObjectValues(socket, 'updated-values');
      }
    socket.disconnect()
  });

  socket.on('value', (data: {type: string, username: string}) => {
    if (data.type === 'login') {
      clearInterval(interval);

      interval = setInterval(async () => {
        await emitUpdatedObjectValues(socket, 'updated-values');
      }, 15000);
    }
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    clearInterval(interval);
  });
}

export const websocket = {
  sendUpdatedValues,
}

async function emitUpdatedObjectValues(socket: any, event: string) {
  const { bidValue: usd } = await getUSDinGBP();
  const { bidValue: gbp } = await getGBPinUSD();
  socket.emit(event, {
    usdValue: usd,
    gbpValue: gbp,
    updatedAt: Date.now(),
  });
}
