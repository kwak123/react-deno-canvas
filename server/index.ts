import {
  serve,
  ServerRequest,
} from 'https://deno.land/std@v0.36.0/http/server.ts';

const s = serve({ port: 3000 });

(async function() {
  for await (const req of s as ServerRequest) {
    console.log(req.method);
    req.respond({ body: 'Hello World\n' });
  }
})();
