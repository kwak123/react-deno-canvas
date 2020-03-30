import React from "react"
import { useSelector, useDispatch } from "react-redux"

import CanvasElement, { DrawStartEvent, DrawMoveEvent } from "./CanvasElement"
import { CanvasHelper } from "./canvasHelper"
import { sendStrokeToService } from "../../store/canvas/actions"
import { selectStrokes } from "../../store/canvas/selectors"

const canvasHelper = new CanvasHelper()

interface CanvasProps {
  showSpinner?: boolean
}

/* Adapted from https://stackoverflow.com/a/8398189 */
const Canvas: React.FC<CanvasProps> = ({ showSpinner = false }) => {
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

  // Ref can likely fix a lot of the bloat in here
  return (
    <CanvasElement
      strokes={strokes}
      handleDrawStart={handleDrawStart}
      handleDrawMove={handleDrawMove}
      handleDrawStop={handleDrawStop}
      allowDrawing={!showSpinner && true}
      showSpinner={showSpinner}
    />
  )
}

export default Canvas
