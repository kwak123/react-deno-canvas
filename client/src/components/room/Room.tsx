import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import services from "../../services"
import { Room } from "../../services/rooms"

import { setStrokes } from "../../store/canvas/actions"

import Canvas from "../canvas/Canvas"

interface RoomQueryParams {
  roomId: string
}

const Container = styled.div``

const Room = () => {
  const dispatch = useDispatch()
  const params = useParams<RoomQueryParams>()
  const roomId = params.roomId
  const [room, setRoom] = useState<Room>(null)

  useEffect(() => {
    services.socketService.initializeSocket(roomId)
    services.roomsService
      .getRoom(roomId)
      .then((roomFromApi) => setRoom(roomFromApi))
    return function clean() {
      services.socketService.closeSocket()
      dispatch(setStrokes([]))
    }
  }, [roomId])

  return (
    <Container>
      <h2>{room?.title || "Untitled"}</h2>
      <Canvas />
    </Container>
  )
}

export default Room
