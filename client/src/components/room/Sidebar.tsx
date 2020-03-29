import React from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import services from "../../services"

import { undoStrokeFromService } from "../../store/canvas/actions"

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
`

const Header = styled.h4`
  margin-bottom: 8px;
`

const Icon = styled.button`
  height: 48px;
  width: 48px;
  border: none;
  margin-bottom: 8px;
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
      <Icon onClick={hardUndo}>Hard Undo</Icon>
    </Container>
  )
}

export default Sidebar
