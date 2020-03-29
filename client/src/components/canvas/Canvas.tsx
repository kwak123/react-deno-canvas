import React from "react"
import { useSelector, useDispatch } from "react-redux"

import CanvasElement, { DrawStartEvent, DrawMoveEvent } from "./CanvasElement"
import { CanvasHelper } from "./canvasHelper"
import {
  undoStrokeFromService,
  sendStrokeToService,
} from "../../store/canvas/actions"
import { selectStrokes } from "../../store/canvas/selectors"
import services from "../../services"

const canvasHelper = new CanvasHelper()

/* Adapted from https://stackoverflow.com/a/8398189 */
const Canvas = () => {
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

  const hardUndo = () => {
    services.socketService.sendMessage({ forceDelete: true })
  }

  // Ref can likely fix a lot of the bloat in here
  return (
    <>
      <button onClick={undoDraw}>Undo</button>
      <button onClick={hardUndo}>Hard undo</button>
      <CanvasElement
        strokes={strokes}
        handleDrawStart={handleDrawStart}
        handleDrawMove={handleDrawMove}
        handleDrawStop={handleDrawStop}
        allowDrawing={true}
      />
    </>
  )
}

export default Canvas
