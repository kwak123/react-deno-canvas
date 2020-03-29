import React, { useEffect } from "react"
import { Provider } from "react-redux"

import Main from "./components/Main"
import store from "./store"
import services from "./services"

const App = () => {
  useEffect(() => {
    services.socketService.initializeSocket()
    services.roomsService.getRoomNames().then((data) => console.log(data))
  })
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Main />
      </Provider>
    </React.StrictMode>
  )
}

export default App
