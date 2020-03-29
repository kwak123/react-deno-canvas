import React from "react"
import { Room } from "../../services/rooms"

import CanvasElement from "../canvas/CanvasElement"

interface RoomCardProps {
  room: Room
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => (
  <div>
    <h3>{room.title}</h3>
    <p>Active Users: {room.count}</p>
    <CanvasElement
      scale={0.2}
      strokes={room.lines}
      allowDrawing={false}
    ></CanvasElement>
  </div>
)

export default RoomCard
