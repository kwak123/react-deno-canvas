import { serve, ServerRequest } from './deps.ts';
import { getSocket } from './socket/socket.ts';
import { RoomHelper } from './rooms/rooms.ts';
import { getFileOrIndexHtml } from './helpers/files.ts';
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
    headers.set('content-length', fileInfo.len.toString());

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

for await (const req of serve(`:${port}`)) {
  try {
    if (req.url.includes('/api/room')) {
      const roomId = req.url.split('/').pop();
      const room = roomHelper.getOrCreateRoom(roomId as string);
      const socket = await getSocket(req);
      room.addSocket(socket);
    } else if (req.url === '/api/rooms') {
      if (req.method === 'GET') {
        req.respond({
          status: 400,
          body: JSON.stringify(roomHelper.getRoomNames()),
        });
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
