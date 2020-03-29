import { getRoomIdRegex } from './regex.ts';
import { asserts } from '../deps.ts';
const { assertEquals } = asserts;

Deno.test(function shouldReturnRoomId() {
  const testString = '/api/room/123';
  const result = testString.match(getRoomIdRegex)!;
  assertEquals(result[1], '123');
  assertEquals(result[2], undefined);
});

Deno.test(function shouldDetermineIfIncludesSocket() {
  const testStringWithSocket = '/api/room/123/set-socket';
  const result = testStringWithSocket.match(getRoomIdRegex)!;
  assertEquals(result[1], '123');
  assertEquals(result[2], 'set-socket');
});
