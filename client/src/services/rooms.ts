import axios from "axios"

enum RoomsEndpoint {
  getAllRooms = "/api/rooms",
}

export class RoomsHelper {
  async getRoomNames() {
    try {
      const roomNamesResponse = await axios.get(RoomsEndpoint.getAllRooms)
      return roomNamesResponse.data as string[]
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
