import React from "react"
import styled from "styled-components"

import { COLORS } from "../styling"
import { Container } from "./common"

import { Room } from "../../services/rooms"

import CanvasElement from "../canvas/CanvasElement"
import { useHistory } from "react-router"

interface RoomCardProps {
  room: Room
}

const RoomCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  height: calc(100% - 48px);
  width: calc(100% - 48px);
  background-color: ${COLORS.BLUE_OCEAN};
  border-radius: 6px;
`

const RoomTitleContainer = styled.div`
  font-size: 30px;
  width: 100%;
  color: ${COLORS.WHITE_CREAM};
  margin-bottom: 16px;
`

const UserCountContainer = styled.div`
  font-size: 20px;
  width: 100%;
  color: ${COLORS.WHITE_CREAM};
  margin-bottom: 24px;
`

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PreviewHeader = styled.h4`
  font-size: 18px;
  color: ${COLORS.WHITE_CREAM};
  margin-bottom: 12px;
`

const CanvasContainer = styled.div``

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const history = useHistory()
  return (
    <Container onClick={() => history.push(`/room/${room.id}`)}>
      <RoomCardContainer>
        <div>
          <RoomTitleContainer>
            <h3>{room.title || "Untitled"}</h3>
          </RoomTitleContainer>
          <UserCountContainer>
            <p>Current Users: {room.count}</p>
          </UserCountContainer>
        </div>
        <PreviewContainer>
          <PreviewHeader>Preview</PreviewHeader>
          <CanvasContainer>
            <CanvasElement
              scale={0.2}
              strokes={room.lines}
              allowDrawing={false}
            />
          </CanvasContainer>
        </PreviewContainer>
      </RoomCardContainer>
    </Container>
  )
}

export default RoomCard
