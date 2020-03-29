import { WebSocket } from '../deps.ts';

const rooms: Map<string, Room> = new Map();

// lastx, lastY, currX, currY
declare type LineTuple = [number, number, number, number];

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
  addSocket: (socket: WebSocket) => Promise<void>;
  deleteSocket: (socket: WebSocket) => void;
  updateSockets: () => void;
  addLine: (line: Line) => void;
  deleteLine: (lineId: string) => void;
}

class RoomImpl implements Room {
  sockets: Set<WebSocket>;
  lines: Line[];

  constructor() {
    this.sockets = new Set();
    this.lines = [];
  }

  async addSocket(socket: WebSocket) {
    this.sockets.add(socket);
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
}

export class RoomHelper {
  getOrCreateRoom(roomId: string) {
    if (!rooms.has(roomId)) {
      const room = new RoomImpl();
      rooms.set(roomId, room);
    }
    return rooms.get(roomId) as Room;
  }
  getRoomNames() {
    return rooms.keys();
  }
}
