import React, { useEffect } from "react"
import { useParams } from "react-router"
import services from "../../services"

import Canvas from "../canvas/Canvas"

interface RoomQueryParams {
  roomId: string
}

const Room = () => {
  const params = useParams<RoomQueryParams>()
  const roomId = params.roomId

  useEffect(() => {
    services.socketService.initializeSocket(roomId)
    return function clean() {
      services.socketService.closeSocket()
    }
  }, [roomId])

  return (
    <div>
      <Canvas />
    </div>
  )
}

export default Room
