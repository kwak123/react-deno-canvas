import {
  WebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  acceptWebSocket,
  ServerRequest,
  v4,
} from '../deps.ts';

const lines: any[] = [];
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
  socket.send(JSON.stringify(lines));

  for await (const event of socket.receive()) {
    if (typeof event === 'string') {
      console.log('Event!');
      const line = JSON.parse(event);
      lines.push(line);
      updateSockets();
    } else if (isWebSocketCloseEvent(event)) {
      sockets.delete(socket);
    }
  }
};

export const updateSockets = () => {
  const linesString = JSON.stringify(lines);
  sockets.forEach(socket => {
    if (!socket.isClosed) {
      socket.send(linesString);
    }
  });
};

export const clearLines = () => {
  lines.splice(0, lines.length);
};
