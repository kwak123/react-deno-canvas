Will probably need to do first to fetch deps (and again with an additional --write-lock whenever you import a new dep).

## Starting up Server

On first load:
`deno fetch deps.ts --lock=lock.json --reload`

After adding deps:
`deno fetch deps.ts --lock=lock.json --reload --lock-write`

Starting server:
`deno --alow-net server/index.ts`

You will likely need to change the `http://` and `https://` module resolution directories in `tsconfig.json`

## My personal Deno notes

You _need_ the Axetroy Deno plugin for this to work at all efficiently.
The `tsconfig.json` in here is the only effective one I've seen to get this to work as you'd expect.
There's a couple `@ts-ignore` lines you'll have to chuck into the lib file to get things to work.
