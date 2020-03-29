import React from "react"
import { RoomResponse } from "../../services/rooms"
import RoomCard from "./RoomCard"

interface RoomListProps {
  roomList: RoomResponse
}

const RoomList: React.FC<RoomListProps> = ({ roomList }) => {
  return (
    <div>
      {roomList.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}

export default RoomList
