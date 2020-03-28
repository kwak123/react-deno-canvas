import * as React from "react"
import { Provider } from "react-redux"
import { w3cwebsocket as Socket } from "websocket"
import Main from "./components/Main"
import store from "./store"

const App = () => {
  let client: Socket

  React.useEffect(() => {
    // client = new Socket("ws://127.0.0.1:8000/api/set-socket")
    // client.onopen = () => {
    //   console.log("Opening socket")
    // }
    // client.onmessage = (event) => {
    //   console.log(event)
    // }
  }, [])

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

export default App
