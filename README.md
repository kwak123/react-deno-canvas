Will probably need to do deno fetch index.ts --lock=lock.json --reload first to fetch deps (and again with an additional --write-lock whenever you import a new dep).
