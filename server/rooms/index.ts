import { WebSocket } from '../deps.ts';

const rooms: Map<string, Room> = new Map();

// lastx, lastY, currX, currY
declare type LineTuple = [number, number, number, number];

interface Line {
  id: string;
  data: LineTuple[];
}

interface DeleteLineRequest {
  id?: string;
  delete: boolean;
}

interface Room {
  sockets: Set<WebSocket>;
  lines: Line[];
  addSocket: (socket: WebSocket) => void;
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

  addSocket(socket: WebSocket) {
    this.sockets.add(socket);
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
    this.sockets.forEach(socket => {
      socket.send(JSON.stringify(this.lines));
    });
  }
}

class RoomHelper {
  getOrCreateRoom(roomId: string) {
    if (!rooms.has(roomId)) {
    }
  }
}

export default RoomHelper;
