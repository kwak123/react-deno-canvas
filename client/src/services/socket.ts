import { w3cwebsocket as WebSocket } from "websocket"
import { setStrokes } from "../store/canvas/actions"
import store from "../store"
import { CanvasStroke } from "../store/canvas/reducers"

// TODO: Fix this in the future
const socketUrl = "wss://bcab44a0.ngrok.io/api/set-socket"
let socket: WebSocket

export class SocketHelper {
  initializeSocket() {
    if (!socket) {
      socket = new WebSocket(socketUrl)
      socket.onopen = () => {
        console.log("Socket opening")
      }
      socket.onmessage = (message) => {
        // console.log("message", message)
        const strokes: CanvasStroke[] = JSON.parse(message.data as string)
        store.dispatch(setStrokes(strokes))
      }
      socket.onerror = (e) => {
        console.error(e)
      }
    }
  }
  getSocket = () => socket
  sendMessage = (message: any) => {
    socket.send(JSON.stringify(message))
  }
}
