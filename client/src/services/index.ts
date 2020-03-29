import { SocketHelper } from "./socket"
import { RoomsHelper } from "./rooms"

export interface AppService {
  socketService: SocketHelper
  roomsService: RoomsHelper
}

export default {
  socketService: new SocketHelper(),
  roomsService: new RoomsHelper(),
} as AppService
