import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useDispatch } from "react-redux"
import styled, { keyframes } from "styled-components"

import services from "../../services"
import { Room } from "../../services/rooms"

import { setStrokes } from "../../store/canvas/actions"

import Sidebar from "./Sidebar"
import Canvas from "../canvas/Canvas"
import { COLORS } from "../styling"

interface RoomQueryParams {
  roomId: string
}

const errorSlideDown = keyframes`
0% {
  opacity: 0;
  transform: translateY(-30px);
}

100% {
  opacity: 1;
  transform: translateY(0);
}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;

  @media only screen and (max-width: 640px) {
    padding-bottom: 88px;
  }
`

const RoomTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 24px;
  align-self: center;
  color: ${COLORS.WHITE_CREAM};

  @media only screen and (max-width: 1200px) {
    align-self: flex-start;
  }
`

const RoomErrorSpacer = styled.div`
  height: 74px;
`

const RoomErrorContainer = styled.div`
  background-color: ${COLORS.BLACK_NEAR};
  font-size: 1.125rem;
  border-radius: 4px;
  width: fit-content;
  padding: 16px 20px;
  margin-bottom: 24px;
  transition: height 0.5s;
  align-self: center;
  animation: ${errorSlideDown} 0.5s linear forwards;

  @media only screen and (max-width: 1200px) {
    align-self: flex-start;
    font-size: 0.875rem;
  }
`

const RoomError = styled.h3`
  color: ${COLORS.RED_BRIGHT};
`

const Room = () => {
  const dispatch = useDispatch()
  const params = useParams<RoomQueryParams>()
  const roomId = params.roomId
  const [room, setRoom] = useState<Room>(null)
  const [showSpinner, setShowSpinner] = useState(true)
  const [error, setError] = useState<string>(null)

  useEffect(function changeBackground() {
    document.body.style.setProperty("background-color", COLORS.BLUE_OCEAN)
  })

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
            setError("Sorry, we couldn't get room details")
          })
      } else {
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
      {error?.length > 0 ? (
        <RoomErrorContainer>
          <RoomError>{error}</RoomError>
        </RoomErrorContainer>
      ) : (
        <RoomErrorSpacer />
      )}
      <RoomTitle>{room?.title || "Untitled"}</RoomTitle>
      <Canvas showSpinner={showSpinner} />
    </Container>
  )
}

export default Room
