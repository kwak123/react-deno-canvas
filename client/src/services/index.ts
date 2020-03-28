import { SocketHelper } from "./socket"

export interface AppService {
  socketService: SocketHelper
}

export default {
  socketService: new SocketHelper(),
} as AppService
