import client from './client.ts';
import { Line } from '../rooms/rooms.ts';

interface RedisRoom {
  id: string;
  title: string;
  lines: Line[];
}

// need concept of pruning old rooms that have fallen away from memory
const convertRedisHashToObj = (redisHash: string[]) => {
  const obj: { [key: string]: any } = {};
  for (let i = 0; i < redisHash.length - 1; i += 2) {
    const j = i + 1;
    const key = redisHash[i];
    if (key === 'title') {
      const value = redisHash[j];
      obj[key] = value;
    } else {
      const value = JSON.parse(redisHash[j]);
      obj[key] = value;
    }
  }

  if (!obj.title) {
    obj.title = '';
  }

  if (!obj.lines) {
    obj.lines = [];
  }

  return obj;
};

/**
 * Primarily, this serves as the voice of truth for what rooms and lines exist.
 * Ideally, rooms are created via Redis on startup, then RoomImpl is generated and only
 * exists to hold sockets
 */
export class RedisHelper {
  ROOMS = 'rooms';

  async getAllRooms() {
    const roomIds = await client.smembers(this.ROOMS);
    const rooms = await Promise.all(
      roomIds.map(
        async id =>
          await client.hgetall(id).then((roomHash: string[]) => ({
            ...convertRedisHashToObj(roomHash),
            id,
          })),
      ),
    );
    return rooms as RedisRoom[];
  }

  async getOrCreateRoom(roomId: string) {
    const hash = await client.hgetall(roomId);
    await client.sadd(this.ROOMS, roomId);
    return convertRedisHashToObj(hash) as RedisRoom;
  }

  async updateRoomTitle(roomId: string, title: string) {
    const res = await client.hset(roomId, 'title', title);
    return res;
  }

  async updateRoomLines(roomId: string, lines: Line[]) {
    const linesString = JSON.stringify(lines);
    const res = await client.hset(roomId, 'lines', linesString);
    return res;
  }

  /**
   * Get lines
   * @param roomId id
   * @returns stringified version of lines
   */
  async getRoomLines(roomId: string) {
    const res = await client.hget(roomId, 'lines');
    return res;
  }
}
