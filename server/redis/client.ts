import { connect } from '../deps.ts';

const client = await connect({
  hostname: Deno.env('REDIS_URL') ?? '127.0.0.1',
  port: 6379,
});

export default client;
