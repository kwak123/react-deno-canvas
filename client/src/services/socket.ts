import { w3cwebsocket as WebSocket } from "websocket"
import { setStrokes } from "../store/canvas/actions"
import store from "../store"
import { CanvasStroke } from "../store/canvas/reducers"

// TODO: Fix this in the future
const serverUrl = "e08999ba.ngrok.io"
// const socketUrl = "wss://bcab44a0.ngrok.io/api/room/123/set-socket"

export class SocketHelper {
  socket: WebSocket

  initializeSocket(
    roomId: string,
    socketConnectedCb: (success: boolean) => void
  ) {
    if (!this.socket) {
      const socketUrl = `wss://${serverUrl}/api/room/${roomId}/set-socket`
      this.socket = new WebSocket(socketUrl)
      this.socket.onopen = () => {
        console.log(`Socket opening for ${roomId}`)
      }
      this.socket.onerror = (e) => {
        socketConnectedCb(false)
        console.error(e)
      }
    }
    this.socket.onmessage = (message) => {
      if (message.data === "Connected!") {
        socketConnectedCb(true)
      } else {
        const strokes: CanvasStroke[] = JSON.parse(message.data as string)
        store.dispatch(setStrokes(strokes))
      }
    }
  }
  sendMessage(message: any) {
    this.socket.send(JSON.stringify(message))
  }
  closeSocket() {
    console.log("Socket closing")
    this.socket.close()
    this.socket = null
  }
}
