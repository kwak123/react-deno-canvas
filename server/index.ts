import {
  serve,
  WebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  acceptWebSocket,
  Application,
  Router,
  send,
  Response,
  exists,
} from './deps.ts';
import { addSocket, pingSocket } from './socket/socket.ts';
import { walkSync } from 'https://deno.land/std@v0.37.1/fs/walk.ts';
const port = Deno.args[0] || '8080';

const tryToServeFile = async (fileName: string) => {
  const distDirectory = `${Deno.cwd()}/../dist`;
  const filePath = `${distDirectory}${fileName}`;
  try {
    const [file, fileInfo] = await Promise.all([
      Deno.open(filePath),
      Deno.stat(filePath),
    ]);

    const headers = new Headers();
    headers.set('content-length', fileInfo.size.toString());

    if (fileName.includes('.css')) {
      headers.set('content-type', 'text/css');
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

for await (const req of serve(`:${port}`)) {
  const { headers, conn } = req;
  try {
    if (
      req.url === '/' ||
      req.url.includes('.js') ||
      req.url.includes('.css')
    ) {
      if (req.url === '/') {
        const res = await tryToServeFile('/index.html');
        await req.respond(res);
      } else {
        const res = await tryToServeFile(req.url);
        await req.respond(res);
      }
    }
    if (req.url === '/api/set-socket') {
      addSocket(req);
    }
  } catch (e) {
    const res = { status: 404 };
    req.respond(res);
  }
}
