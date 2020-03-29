import React, { useState, useRef, MouseEvent, TouchEvent } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"

import CanvasElement, { DrawStartEvent, DrawMoveEvent } from "./CanvasElement"
import { CanvasHelper } from "./canvasHelper"
import {
  undoStrokeFromService,
  sendStrokeToService,
} from "../../store/canvas/actions"
import { selectStrokes } from "../../store/canvas/selectors"

interface Position {
  x: number
  y: number
}

const HtmlCanvas = styled.canvas`
  border: 1px solid black;
`

const canvasHelper = new CanvasHelper()

/* Adapted from https://stackoverflow.com/a/8398189 */
const Canvas = () => {
  const width = 1200
  const height = 600
  const dispatch = useDispatch()
  const strokes = useSelector(selectStrokes)

  const handleDrawStart = ({ clientX, clientY }: DrawStartEvent) => {
    canvasHelper.start()
  }

  const handleDrawMove = ({ lastX, lastY, currX, currY }: DrawMoveEvent) => {
    canvasHelper.append([lastX, lastY, currX, currY])
  }

  const handleDrawStop = () => {
    const finishedStroke = canvasHelper.close()

    if (finishedStroke) {
      dispatch(sendStrokeToService(finishedStroke))
    }
  }

  const undoDraw = () => {
    dispatch(undoStrokeFromService())
  }

  // Ref can likely fix a lot of the bloat in here
  return (
    <>
      <button onClick={undoDraw}>Undo</button>
      <CanvasElement
        height={height}
        width={width}
        strokes={strokes}
        handleDrawStart={handleDrawStart}
        handleDrawMove={handleDrawMove}
        handleDrawStop={handleDrawStop}
      />
    </>
  )
}

export default Canvas
