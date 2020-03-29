import React, { useState, useEffect } from "react"
import styled from "styled-components"
import services from "../../services"
import { RoomResponse } from "../../services/rooms"
import HeartSpinner from "../loadingSpinner/HeartSpinner"
import RoomCard from "./RoomCard"
import AddRoomCard from "./AddRoomCard"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  margin-bottom: 16px;
`

const RoomList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [roomList, setRoomList] = useState([])

  useEffect(() => {
    setIsLoading(true)
    services.roomsService.getRooms().then((roomResponse) => {
      setIsLoading(false)
      setRoomList(roomResponse)
    })
  }, [])

  const list = (
    <ListContainer>
      {roomList.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
      <AddRoomCard />
    </ListContainer>
  )

  return <Container>{isLoading ? HeartSpinner : list}</Container>
}

export default RoomList
