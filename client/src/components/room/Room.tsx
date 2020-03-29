import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import services from "../../services"
import { Room } from "../../services/rooms"

import { setStrokes } from "../../store/canvas/actions"

import Sidebar from "./Sidebar"
import Canvas from "../canvas/Canvas"

interface RoomQueryParams {
  roomId: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
`

const RoomTitle = styled.h2``

const Room = () => {
  const dispatch = useDispatch()
  const params = useParams<RoomQueryParams>()
  const roomId = params.roomId
  const [room, setRoom] = useState<Room>(null)

  useEffect(() => {
    services.socketService.initializeSocket(roomId, (success: boolean) => {
      if (success) {
        services.roomsService
          .getRoom(roomId)
          .then((roomFromApi) => setRoom(roomFromApi))
      }
    })
    return function clean() {
      services.socketService.closeSocket()
      dispatch(setStrokes([]))
    }
  }, [roomId])

  return (
    <Container>
      <h2>{room?.title || "Untitled"}</h2>
      <Sidebar />
      <Canvas />
    </Container>
  )
}

export default Room
