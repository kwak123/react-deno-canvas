Will probably need to do first to fetch deps (and again with an additional --write-lock whenever you import a new dep).

## Starting up Server

On first load:
`deno fetch index.ts --lock=lock.json --reload`

After adding deps:
`deno fetch index.ts --lock=lock.json --reload --lock-write`
