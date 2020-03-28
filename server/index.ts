import {
  serve,
  WebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  acceptWebSocket,
  Application,
  Router,
  send,
} from './deps.ts';
import { addSocket, pingSocket } from './socket/socket.ts';

const port = Deno.args[0] || '8080';

const router = new Router();

router.get('/api/set-socket', async (context, next) => {
  console.debug('Requesting socket');
  await addSocket(context.request.serverRequest);
  console.debug('Socket set');
});

router.post('/api/test/:uuid', async context => {
  if (context.params.uuid) {
    console.log(context.params.uuid);
    await pingSocket(context.params.uuid);
  }
});

const app = new Application();

app.use(async ({ request }, next) => {
  await next();
  console.log(`Received ${request.method} request to ${request.path}`);
});

app.use(router.routes());
app.use(router.allowedMethods());

// Server static files
app.use(async ctx => {
  try {
    await send(ctx, ctx.request.path, {
      root: `${Deno.cwd()}/../dist`,
      index: 'index.html',
    });
  } catch (e) {
    // No favicon yet
    console.error(e);
  }
});

console.log(`App listening on ${port}`);
await app.listen({ port: Number(port) });

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
