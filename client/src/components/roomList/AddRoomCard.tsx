import React from "react"
import styled from "styled-components"

import { Container } from "./common"
import { COLORS } from "../styling"

const AddCardContainer = styled.div`
  background-color: ${COLORS.BLUE_OCEAN};
  display: flex;
  align-item: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 6px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.WHITE_CREAM};
`

const AddSignSpan = styled.span`
  font-size: 24px;
  margin-right: 8px;
`

const CreateRoom = styled.button`
  color: ${COLORS.WHITE_CREAM};
  background-color: transparent;
  padding: 0;
  border: none;
  font-size: 24px;
  text-decoration: none;
  height: fit-content;
`

const AddRoomCard = () => (
  <Container>
    <AddCardContainer>
      <ButtonContainer>
        <AddSignSpan>+</AddSignSpan>
        <CreateRoom>Create Room</CreateRoom>
      </ButtonContainer>
    </AddCardContainer>
  </Container>
)

export default AddRoomCard
