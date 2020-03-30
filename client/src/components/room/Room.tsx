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

  @media only screen and (max-width: 640px) {
    padding-bottom: 88px;
  }
`

const RoomTitle = styled.h2``

const Room = () => {
  const dispatch = useDispatch()
  const params = useParams<RoomQueryParams>()
  const roomId = params.roomId
  const [room, setRoom] = useState<Room>(null)
  const [showSpinner, setShowSpinner] = useState(true)
  const [error, setError] = useState<string>(null)

  useEffect(() => {
    setShowSpinner(true)
    services.socketService.initializeSocket(roomId, (success: boolean) => {
      if (success) {
        services.roomsService
          .getRoom(roomId)
          .then((roomFromApi) => {
            setRoom(roomFromApi)
            setShowSpinner(false)
            setError(null)
          })
          .catch((e) => {
            console.error(e)
            setShowSpinner(false)
            setError("Sorry, we weren't able to get details for this room")
          })
      } else {
        setShowSpinner(false)
        setError("Uh oh! We're having trouble connecting you to this room")
      }
    })
    return function clean() {
      services.socketService.closeSocket()
      dispatch(setStrokes([]))
    }
  }, [roomId])

  return (
    <Container>
      {error?.length > 0 && <p>{error}</p>}
      <RoomTitle>{room?.title || "Untitled"}</RoomTitle>
      <Canvas showSpinner={showSpinner} />
    </Container>
  )
}

export default Room
