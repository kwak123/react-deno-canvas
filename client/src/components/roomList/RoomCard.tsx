import React from "react"
import styled from "styled-components"

import { Container } from "./common"

import { Room } from "../../services/rooms"

import CanvasElement from "../canvas/CanvasElement"

interface RoomCardProps {
  room: Room
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => (
  <Container>
    <h3>{room.title || "Untitled"}</h3>
    <p>Active Users: {room.count}</p>
    <div>
      <CanvasElement scale={0.2} strokes={room.lines} allowDrawing={false} />
    </div>
  </Container>
)

export default RoomCard
