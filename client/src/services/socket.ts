import { w3cwebsocket as WebSocket } from "websocket"
import { setStrokes } from "../store/canvas/actions"
import store from "../store"
import { CanvasStroke } from "../store/canvas/reducers"

// TODO: Fix this in the future
const serverUrl = "bcab44a0.ngrok.io"
// const socketUrl = "wss://bcab44a0.ngrok.io/api/room/123/set-socket"

export class SocketHelper {
  socket: WebSocket

  initializeSocket(roomId: string) {
    if (!this.socket) {
      const socketUrl = `wss://${serverUrl}/api/room/${roomId}/set-socket`
      this.socket = new WebSocket(socketUrl)
      this.socket.onopen = () => {
        console.log("Socket opening")
      }
      this.socket.onmessage = (message) => {
        // console.log("message", message)
        const strokes: CanvasStroke[] = JSON.parse(message.data as string)
        store.dispatch(setStrokes(strokes))
      }
      this.socket.onerror = (e) => {
        console.error(e)
      }
    }
  }
  sendMessage(message: any) {
    this.socket.send(JSON.stringify(message))
  }
  closeSocket() {
    this.socket.close()
  }
}
