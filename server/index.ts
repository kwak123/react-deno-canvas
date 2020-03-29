import { serve, exists } from './deps.ts';
import { addSocket, clearLines } from './socket/socket.ts';

const port = Deno.args[0] || '8080';

const tryToServeFile = async (fileName: string) => {
  const distDirectory = `${Deno.cwd()}/../dist`;
  const filePath = `${distDirectory}${fileName}`;
  try {
    const fileExists = await exists(filePath);
    let file: Deno.File;
    let fileInfo: Deno.FileInfo;

    if (fileExists) {
      [file, fileInfo] = await Promise.all([
        Deno.open(filePath),
        Deno.stat(filePath),
      ]);
    } else {
      const indexHtmlPath = `${distDirectory}/index.html`;
      [file, fileInfo] = await Promise.all([
        Deno.open(indexHtmlPath),
        Deno.stat(indexHtmlPath),
      ]);
    }

    const headers = new Headers();
    headers.set('content-length', fileInfo.len.toString());

    if (fileName.includes('.css')) {
      headers.set('content-type', 'text/css');
    }

    if (fileName.includes('.png')) {
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
  try {
    if (req.url.includes('/api/room')) {
      const roomId = req.url.split('/').pop();
      addSocket(req);
    } else if (req.url === '/api/set-socket') {
      addSocket(req);
    } else if (req.url === '/api/clear') {
      clearLines();
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
