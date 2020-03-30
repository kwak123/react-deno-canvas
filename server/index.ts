import {
  serve,
  ServerRequest,
  isWebSocketPingEvent,
  isWebSocketPongEvent,
} from './deps.ts';
import { getSocket } from './socket/socket.ts';
import { RoomHelper } from './rooms/rooms.ts';
import { getFileOrIndexHtml } from './helpers/files.ts';
import { getRoomIdRegex } from './helpers/regex.ts';

const roomHelper = new RoomHelper();

const port = Deno.args[0] || '8080';

console.log(`Server listening on port ${port}`);
const tryToServeFile = async (fileName: string) => {
  const distDirectory = `${Deno.cwd()}/../dist`;
  try {
    const gottenFile = await getFileOrIndexHtml(distDirectory, fileName);
    if (!gottenFile) {
      throw 'File not found';
    }

    const { file, fileInfo, fileType } = gottenFile;

    const headers = new Headers();
    headers.set('content-length', fileInfo.size.toString());

    if (fileType === 'css') {
      headers.set('content-type', 'text/css');
    }

    if (fileType === 'png') {
      headers.set('Cache-Control', 'max-age=86400');
      headers.set('Content-Type', 'image/png');
    }

    const res = {
      status: 200,
      body: file,
      headers,
    };
    return res;
  } catch (e) {
    const res = {
      status: 404,
    };
    return res;
  }
};

const send404 = (req: ServerRequest) => req.respond({ status: 404 });

enum ReqMethod {
  GET = 'GET',
}

await roomHelper.initializeRooms();

for await (const req of serve(`:${port}`)) {
  // console.log(`Received ${req.method} request to ${req.url}`);
  try {
    if (req.url === '/api/rooms') {
      if (req.method === ReqMethod.GET) {
        const body = JSON.stringify(roomHelper.getRooms());
        req.respond({
          status: 200,
          body,
        });
      } else {
        send404(req);
      }
    } else if (req.url.includes('/api/room')) {
      const [, roomId, shouldSetSocket] = req.url.match(getRoomIdRegex)!;
      if (roomId && shouldSetSocket) {
        const room = await roomHelper.getOrCreateRoom(roomId as string);
        const socket = await getSocket(req);
        room.addSocket(socket);
      } else if (roomId) {
        const room = roomHelper.getRoom(roomId);

        if (!room) {
          send404(req);
        }

        const roomBody = JSON.stringify(room);
        req.respond({ status: 200, body: roomBody });
      } else {
        send404(req);
      }
    } else {
      let res;
      if (req.url === '/') {
        res = await tryToServeFile('/index.html');
      } else {
        res = await tryToServeFile(req.url);
      }
      await req.respond(res);
    }
  } catch (e) {
    const res = { status: 404 };
    req.respond(res);
  }
}
