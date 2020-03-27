Will probably need to do first to fetch deps (and again with an additional --write-lock whenever you import a new dep).

## Starting up Server

On first load:
`deno fetch index.ts --lock=lock.json --reload`

After adding deps:
`deno fetch index.ts --lock=lock.json --reload --lock-write`

Starting server:
`deno --alow-net server/index.ts`

You will likely need to change the `http://` and `https://` module resolution directories in `tsconfig.json`
