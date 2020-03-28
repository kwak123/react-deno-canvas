import * as React from "react"
import { w3cwebsocket as Socket } from "websocket"
import Main from "./components/Main"

const App = () => {
  let client: Socket

  React.useEffect(() => {
    client = new Socket("ws://127.0.0.1:8000/api/set-socket")
    // client = new Socket("ws://demos.kaazing.com/echo")
    client.onopen = () => {
      console.log("Opening socket")
    }
    client.onmessage = (event) => {
      console.log(event)
    }
  }, [])

  return (
    <>
      <Main />
      <button onClick={() => client.send("Hello")}>Send messsage</button>
    </>
  )
}

export default App
