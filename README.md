## Getting it running

I recommend opening this up as two separate work spaces, one for the client, and one for the server.
They'll be linked via a `dist` file that will be in the root directory.

This is an unfortunate evil due to the VSCode Deno plugin, namely around module resolution (requiring `.ts`, where to resolve against re: `baseUrl`, etc).

Deno is still building up, but it's something!

TODOS:

- [ ] Dockerize both and deploy as docker-compose
