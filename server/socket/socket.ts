import {
  WebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  acceptWebSocket,
  ServerRequest,
  v4,
} from '../deps.ts';

const sockets: Map<string, WebSocket> = new Map();

export const addSocket = async (request: ServerRequest) => {
  const { headers, conn } = request;

  const socket = await acceptWebSocket({
    conn,
    headers,
    bufReader: request.r,
    bufWriter: request.w,
  });

  const it = socket.receive();
  while (true) {
    try {
      const { done, value } = await it.next();
      if (done) {
        break;
      }
      const ev = value;
      if (typeof ev === 'string') {
        // text message
        console.log('ws:Text', ev);
        await socket.send(ev);
      } else if (ev instanceof Uint8Array) {
        // binary message
        console.log('ws:Binary', ev);
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev;
        // ping
        console.log('ws:Ping', body);
      } else if (isWebSocketCloseEvent(ev)) {
        // close
        const { code, reason } = ev;
        console.log('ws:Close', code, reason);
      }
    } catch (e) {
      console.error(`failed to receive frame: ${e}`);
      await socket.close(1000).catch(console.error);
    }
  }

  // const uuid = v4.generate();
  // sockets.set(uuid, socket);
  // console.log('Set socket with uuid ' + uuid);
  // await socket.send('Hi');
  setTimeout(() => {
    console.log(socket.isClosed);
  }, 1000);
};

export const pingSocket = async (uuid: string) => {
  await sockets.get(uuid)?.send('Hi');
};

export const pingAllSockets = async () => {
  sockets.forEach(async socket => {
    await socket.send('Ping!');
  });
};

// console.log(`websocket server is running on :${port}`);
// for await (const req of serve(`:${port}`)) {
//   const { headers, conn } = req;
//   acceptWebSocket({
//     conn,
//     headers,
//     bufReader: req.r,
//     bufWriter: req.w,
//   })
//     .then(
//       async (sock: WebSocket): Promise<void> => {
//         console.log('socket connected!');
//         const it = sock.receive();
//         while (true) {
//           try {
//             const { done, value } = await it.next();
//             if (done) {
//               break;
//             }
//             const ev = value;
//             if (typeof ev === 'string') {
//               // text message
//               console.log('ws:Text', ev);
//               await sock.send(ev);
//             } else if (ev instanceof Uint8Array) {
//               // binary message
//               console.log('ws:Binary', ev);
//             } else if (isWebSocketPingEvent(ev)) {
//               const [, body] = ev;
//               // ping
//               console.log('ws:Ping', body);
//             } else if (isWebSocketCloseEvent(ev)) {
//               // close
//               const { code, reason } = ev;
//               console.log('ws:Close', code, reason);
//             }
//           } catch (e) {
//             console.error(`failed to receive frame: ${e}`);
//             await sock.close(1000).catch(console.error);
//           }
//         }
//       },
//     )
//     .catch((err: Error): void => {
//       console.error(`failed to accept websocket: ${err}`);
//     });
// }
