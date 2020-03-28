import React, { useState, useRef, MouseEvent, TouchEvent } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"

import { CanvasHelper } from "./canvasHelper"
import { addStroke, undoStroke } from "../../store/canvas/actions"
import { selectStrokes } from "../../store/canvas/selectors"

interface Position {
  x: number
  y: number
}

const HtmlCanvas = styled.canvas``

const canvasHelper = new CanvasHelper()

/* Adapted from https://stackoverflow.com/a/8398189 */
const Canvas = () => {
  const dispatch = useDispatch()
  const strokes = useSelector(selectStrokes)
  const whiteboardRef = useRef<HTMLCanvasElement>(null)
  const [shouldDraw, setShouldDraw] = useState(false)
  const [isDot, setIsDot] = useState(false)
  const [isMultiFinger, setIsMultiFinger] = useState(false)
  const [last, setLast] = useState<Position>({ x: 0, y: 0 })
  const [curr, setCurr] = useState<Position>({ x: 0, y: 0 })

  const draw = (
    ctx: CanvasRenderingContext2D,
    lastPos: Position,
    currPos: Position
  ) => {
    const path = new Path2D()
    const { x: lastX, y: lastY } = lastPos
    const { x: currX, y: currY } = currPos
    path.moveTo(lastX, lastY)
    path.lineTo(currX, currY)
    path.closePath()
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.stroke(path)
    canvasHelper.append({
      lastX,
      lastY,
      currX,
      currY,
    })
  }

  const handleStartDraw = ({
    clientX,
    clientY,
  }: {
    clientX: number
    clientY: number
  }) => {
    canvasHelper.start()
    const { current: whiteboard } = whiteboardRef
    const ctx = whiteboard.getContext("2d")
    // Need to move x/y here
    const newX = clientX - whiteboard.offsetLeft
    const newY = clientY - whiteboard.offsetTop
    setLast({ x: newX, y: newY })
    setCurr({ x: newX, y: newY })
    setShouldDraw(true)
    setIsDot(true)

    if (isDot) {
      ctx.beginPath()
      ctx.fillStyle = "black"
      ctx.fillRect(newX, newY, 2, 2)
      ctx.closePath()
      setIsDot(false)
    }
  }

  const handleMoveDraw = ({
    clientX,
    clientY,
  }: {
    clientX: number
    clientY: number
  }) => {
    const { current: whiteboard } = whiteboardRef
    const { x: currX, y: currY } = curr
    const newX = clientX - whiteboard.offsetLeft
    const newY = clientY - whiteboard.offsetTop
    setLast({ x: currX, y: currY })
    setCurr({ x: newX, y: newY })
    draw(whiteboard.getContext("2d"), last, curr)
  }

  const handleStopDraw = () => {
    const finishedStroke = canvasHelper.close()

    if (finishedStroke) {
      dispatch(addStroke(finishedStroke))
      refreshCanvas()
    }
  }

  const undoDraw = () => {
    clearCanvas()
    dispatch(undoStroke())
    refreshCanvas()
  }

  const clearCanvas = () => {
    const context = whiteboardRef.current.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, 600, 600)
  }

  const refreshCanvas = () => {
    const { current: whiteboard } = whiteboardRef
    const context = whiteboard.getContext("2d")
    strokes.forEach((stroke) => {
      stroke.forEach(({ lastX, lastY, currX, currY }) => {
        draw(context, { x: lastX, y: lastY }, { x: currX, y: currY })
      })
    })
  }

  const onMouseDown = (event: MouseEvent) => {
    handleStartDraw({
      clientX: event.clientX,
      clientY: event.clientY,
    })
  }

  const onMouseUp = (event: MouseEvent) => {
    setShouldDraw(false)
    handleStopDraw()
  }

  const onMouseMove = (event: MouseEvent) => {
    if (shouldDraw && !isMultiFinger) {
      handleMoveDraw({
        clientX: event.clientX,
        clientY: event.clientY,
      })
    }
  }

  const onTouchStart = (event: TouchEvent) => {
    if (event.touches.length > 1) {
      setIsMultiFinger(true)
      setShouldDraw(false)
    } else {
      setShouldDraw(true)
      handleStartDraw({
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      })
    }
  }
  const onTouchEnd = (event: TouchEvent) => {
    setIsMultiFinger(false)
    setShouldDraw(false)
  }
  const onTouchMove = (event: TouchEvent) => {
    if (shouldDraw && !isMultiFinger) {
      handleMoveDraw({
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      })
    }
  }

  return (
    <>
      <button onClick={undoDraw}>Undo</button>
      <HtmlCanvas
        ref={whiteboardRef}
        style={{ touchAction: isMultiFinger ? "auto" : "pinch-zoom" }}
        id="whiteboard"
        width="600"
        height="600"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        onTouchCancel={onTouchEnd}
      >
        {/* Need to add fallback */}
      </HtmlCanvas>
    </>
  )
}

export default Canvas
