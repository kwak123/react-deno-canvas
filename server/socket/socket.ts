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

  const socketId = v4.generate();
  sockets.set(socketId, socket);

  for await (const event of socket.receive()) {
    if (typeof event === 'string') {
      sockets.forEach(socket => socket.send(event));
    }
  }
};

export const pingSocket = async (uuid: string) => {
  await sockets.get(uuid)?.send('Hi');
};

export const pingAllSockets = async () => {
  sockets.forEach(async socket => {
    await socket.send('Ping!');
  });
};
