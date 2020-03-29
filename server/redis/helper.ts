import client from './client.ts';

// need concept of pruning old rooms that have fallen away from memory

/**
 * Primarily, this serves as the voice of truth for what rooms and lines exist.
 * Ideally, rooms are created via Redis on startup, then RoomImpl is generated and only
 * exists to hold sockets
 */
class RedisHelper {
  async getOrCreateRoom(roomId: string) {
    const set = await client.hgetall(roomId);
    return set;
  }

  async updateRoomTitle(roomId: string, title: string) {
    const res = await client.hset(roomId, 'title', title);
    return res;
  }

  async updateRoomLines(roomId: string, lines: string) {
    const res = await client.hset(roomId, 'lines', lines);
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
