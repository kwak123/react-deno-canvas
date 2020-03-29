import React from "react"
import styled from "styled-components"
import { RoomResponse } from "../../services/rooms"
import RoomCard from "./RoomCard"
import AddRoomCard from "./AddRoomCard"

interface RoomListProps {
  roomList: RoomResponse
}

const ListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
`

const RoomList: React.FC<RoomListProps> = ({ roomList }) => {
  return (
    <div>
      <ListContainer>
        {roomList.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
        <AddRoomCard />
      </ListContainer>
    </div>
  )
}

export default RoomList
