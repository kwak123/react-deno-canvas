import {
  serve,
  WebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  acceptWebSocket,
  Response,
  exists,
} from './deps.ts';
import { addSocket, clearLines } from './socket/socket.ts';

const port = Deno.args[0] || '8080';

const tryToServeFile = async (fileName: string) => {
  const distDirectory = `${Deno.cwd()}/../dist`;
  const filePath = `${distDirectory}${fileName}`;
  try {
    console.log('Reading fileName ' + fileName);
    const [file, fileInfo] = await Promise.all([
      Deno.open(filePath),
      Deno.stat(filePath),
    ]);

    console.log('Finished fileName ' + fileName);

    const headers = new Headers();
    headers.set('content-length', fileInfo.len.toString());

    if (fileName.includes('.css')) {
      headers.set('content-type', 'text/css');
    }

    if (fileName.includes('.png')) {
      console.log('Serving png');
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

for await (const req of serve(`:${port}`)) {
  const { headers, conn } = req;
  try {
    if (
      req.url === '/' ||
      req.url.includes('.js') ||
      req.url.includes('.css') ||
      req.url.includes('.png')
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

    if (req.url === '/api/clear') {
      clearLines();
    }
  } catch (e) {
    const res = { status: 404 };
    req.respond(res);
  }
}
