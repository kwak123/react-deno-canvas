import React from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import services from "../../services"

import { undoStrokeFromService } from "../../store/canvas/actions"
import { COLORS } from "../styling"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 120px;
  left: 16px;
  padding: 8px 2px;
  align-items: center;
  border: 1px black solid;
  border-radius: 4px;
  background-color: white;

  @media only screen and (max-width: 640px) {
    flex-direction: row;
    justify-content: space-evenly;
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 64px;
    border: none;
    border-radius: 0px;
    border-top: 1px ${COLORS.PURPLE_MUTE} solid;
    z-index: 100;
  }
`

const Header = styled.h4`
  margin-bottom: 8px;

  @media only screen and (max-width: 640px) {
    display: none;
  }
`

const Icon = styled.button`
  height: 48px;
  width: 48px;
  border: none;
  margin-bottom: 8px;
`

const Divider = styled.div`
  width: 1px;
  height: 48px;
  background-color: ${COLORS.PURPLE_MUTE};

  @media only screen and (min-width: 640px) {
    display: none;
  }
`

const Sidebar = () => {
  const dispatch = useDispatch()
  const undoDraw = () => {
    dispatch(undoStrokeFromService())
  }

  const hardUndo = () => {
    services.socketService.sendMessage({ forceDelete: true })
  }
  return (
    <Container>
      <Header>Tools</Header>
      <Icon onClick={undoDraw}>Undo</Icon>
      <Divider />
      <Icon onClick={hardUndo}>Hard Undo</Icon>
    </Container>
  )
}

export default Sidebar
