import { WebSocket } from '../deps.ts';
import { isWebSocketCloseEvent } from 'https://deno.land/std@v0.36.0/ws/mod.ts';
const rooms: Map<string, Room> = new Map();

// lastx, lastY, currX, currY, color?
declare type LineTuple = [number, number, number, number, number?];

interface Line {
  id: string;
  data: LineTuple[];
}

interface DeleteLineRequest {
  id: string;
  delete: boolean;
}

interface Room {
  sockets: Set<WebSocket>;
  lines: Line[];
  title: string;
  addSocket: (socket: WebSocket) => Promise<void>;
  deleteSocket: (socket: WebSocket) => void;
  updateSockets: () => void;
  addLine: (line: Line) => void;
  deleteLine: (lineId: string) => void;
  count: () => number;
  setTitle: (title: string) => void;
}

class RoomImpl implements Room {
  sockets: Set<WebSocket>;
  lines: Line[];
  title: string;

  constructor() {
    this.sockets = new Set();
    this.lines = [];
    this.title = '';
  }

  async addSocket(socket: WebSocket) {
    this.sockets.add(socket);
    socket.send('Connected!');
    this.updateSockets();

    for await (const event of socket.receive()) {
      if (typeof event === 'string') {
        const line = JSON.parse(event);
        if (line.delete) {
          this.deleteLine((line as DeleteLineRequest).id);
        } else {
          this.addLine(line);
        }
        this.updateSockets();
      } else if (isWebSocketCloseEvent(event)) {
        this.sockets.delete(socket);
      }
    }
  }

  deleteSocket(socket: WebSocket) {
    this.sockets.delete(socket);
  }

  addLine(line: Line) {
    this.lines.push(line);
  }

  deleteLine(lineId: string) {
    const lineIndex = this.lines.findIndex(line => line.id === lineId);
    if (lineIndex >= 0) {
      this.lines.splice(lineIndex, 1);
      this.updateSockets();
    }
  }

  updateSockets() {
    const socketsToDelete: WebSocket[] = [];
    this.sockets.forEach(socket => {
      if (socket.isClosed) {
        socketsToDelete.push(socket);
      } else {
        socket.send(JSON.stringify(this.lines));
      }
    });
    socketsToDelete.forEach(socket => this.sockets.delete(socket));
  }

  count() {
    return this.sockets.size;
  }

  setTitle(title: string) {
    this.title = title;
  }
}

export class RoomHelper {
  getOrCreateRoom(roomId: string) {
    if (!rooms.has(roomId)) {
      const room = new RoomImpl();
      rooms.set(roomId, room);
    }
    return rooms.get(roomId) as Room;
  }
  getRoomKeys() {
    return [...rooms.keys()];
  }
  getRooms() {
    const roomKeys = this.getRoomKeys();
    const roomsAsSerializable = roomKeys.map(key => {
      const room = rooms.get(key) as Room;
      return {
        id: key,
        title: room.title,
        count: room.count(),
        lines: room.lines,
      };
    });
    return roomsAsSerializable;
  }

  getRoom(roomId: string) {
    const room = rooms.get(roomId);

    if (!room) {
      return null;
    }

    return {
      id: roomId,
      title: room.title,
      count: room.count(),
      lines: room.lines,
    };
  }
}
