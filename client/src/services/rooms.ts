import axios from "axios"
import { CanvasStroke } from "../store/canvas/reducers"

enum RoomsEndpoint {
  getAllRooms = "/api/rooms",
  getRoom = "/api/room",
}

export interface Room {
  id: string
  title: string
  count: number
  lines: CanvasStroke[]
}

export type RoomResponse = Room[]

export class RoomsHelper {
  async getRooms() {
    try {
      const roomNamesResponse = await axios.get(RoomsEndpoint.getAllRooms)
      return roomNamesResponse.data as RoomResponse
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async getRoom(roomId: string) {
    try {
      const roomEndpoint = `${RoomsEndpoint.getRoom}/${roomId}`
      const roomDetailsResponse = await axios.get(roomEndpoint)
      return roomDetailsResponse.data as Room
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
