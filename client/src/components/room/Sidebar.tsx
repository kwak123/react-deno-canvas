import React from "react"
import styled, { keyframes } from "styled-components"
import { useDispatch } from "react-redux"
import services from "../../services"

import { undoStrokeFromService } from "../../store/canvas/actions"
import { COLORS } from "../styling"
import { useLocation } from "react-router"

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
    position: sticky;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 4rem;
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
  background-color: transparent;
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
  // Oh this is SO unfortunate, need to find a way to fix this when I hvae time
  const location = useLocation()
  const showSidebar = location.pathname.includes("/room/")

  const dispatch = useDispatch()
  const undoDraw = () => {
    dispatch(undoStrokeFromService())
  }

  const hardUndo = () => {
    services.socketService.sendMessage({ forceDelete: true })
  }

  if (!showSidebar) {
    return null
  }

  return (
    <Container>
      <Header>Tools</Header>
      <Icon onClick={undoDraw}>Undo</Icon>
      <Divider />
      <Icon onClick={hardUndo}>Hard Undo</Icon>
      <Divider />
      <Icon>Close Room</Icon>
    </Container>
  )
}

export default Sidebar
