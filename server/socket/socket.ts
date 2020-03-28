import {
  WebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  acceptWebSocket,
  ServerRequest,
  v4,
} from '../deps.ts';

const sockets = new Set<WebSocket>();

export const addSocket = async (request: ServerRequest) => {
  const { headers, conn } = request;

  const socket = await acceptWebSocket({
    conn,
    headers,
    bufReader: request.r,
    bufWriter: request.w,
  });

  // const socketId = v4.generate();
  sockets.add(socket);

  for await (const event of socket.receive()) {
    if (typeof event === 'string') {
      sockets.forEach(socket => socket.send(event));
    } else if (isWebSocketCloseEvent(event)) {
      sockets.delete(socket);
    }
  }
};

export const pingAllSockets = async () => {
  sockets.forEach(async socket => {
    await socket.send('Ping!');
  });
};
