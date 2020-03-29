import axios from "axios"
import { CanvasStroke } from "../store/canvas/reducers"

enum RoomsEndpoint {
  getAllRooms = "/api/rooms",
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
}
