import React, { useState, useRef, MouseEvent, TouchEvent } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"

import { CanvasStroke } from "../../store/canvas/reducers"

interface Position {
  x: number
  y: number
}

export interface DrawStartEvent {
  clientX: number
  clientY: number
}

export interface DrawMoveEvent {
  lastX: number
  lastY: number
  currX: number
  currY: number
}

export interface DrawStopEvent {}

interface CanvasElementProps {
  handleDrawStart?: (event: DrawStartEvent) => void
  handleDrawMove?: (event: DrawMoveEvent) => void
  handleDrawStop?: (event: DrawStopEvent) => void
  height: number
  width: number
  strokes: CanvasStroke[]
  allowDrawing: boolean
}

const HtmlCanvas = styled.canvas``

const CanvasElement: React.FC<CanvasElementProps> = ({
  handleDrawStart,
  handleDrawMove,
  handleDrawStop,
  height,
  width,
  strokes,
  allowDrawing = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [shouldDraw, setShouldDraw] = useState(false)
  const [isMultiFinger, setIsMultiFinger] = useState(false)
  const [last, setLast] = useState<Position>({ x: 0, y: 0 })
  const [curr, setCurr] = useState<Position>({ x: 0, y: 0 })

  const drawStart = ({ x: clientX, y: clientY }: Position) => {
    if (allowDrawing) {
      const { current: whiteboard } = canvasRef
      const newX = clientX - whiteboard.offsetLeft
      const newY = clientY - whiteboard.offsetTop
      setLast({ x: newX, y: newY })
      setCurr({ x: newX, y: newY })
      setShouldDraw(true)

      handleDrawStart({ clientX, clientY })
    }
  }

  const drawMove = ({ x: clientX, y: clientY }: Position) => {
    if (allowDrawing) {
      const { current: whiteboard } = canvasRef
      const { x: currX, y: currY } = curr
      const newX = clientX - whiteboard.offsetLeft
      const newY = clientY - whiteboard.offsetTop
      setLast({ x: currX, y: currY })
      setCurr({ x: newX, y: newY })
      draw(whiteboard.getContext("2d"), last, curr)

      handleDrawMove({ lastX: currX, lastY: currY, currX: newX, currY: newY })
    }
  }

  const onMouseDown = (event: MouseEvent) => {
    drawStart({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const onMouseUp = (event: MouseEvent) => {
    setShouldDraw(false)
    handleDrawStop({})
  }

  const onMouseMove = (event: MouseEvent) => {
    if (shouldDraw && !isMultiFinger) {
      drawMove({
        x: event.clientX,
        y: event.clientY,
      })
    }
  }

  const onTouchStart = (event: TouchEvent) => {
    if (event.touches.length > 1) {
      setIsMultiFinger(true)
      setShouldDraw(false)
    } else {
      setShouldDraw(true)
      handleDrawStart({
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      })
    }
  }
  const onTouchEnd = (event: TouchEvent) => {
    setIsMultiFinger(false)
    setShouldDraw(false)
    handleDrawStop({})
  }

  const onTouchMove = (event: TouchEvent) => {
    if (shouldDraw && !isMultiFinger) {
      drawMove({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      })
    }
  }

  const clearCanvas = () => {
    const context = canvasRef.current.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, 1200, 1200)
  }

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
  }

  const refreshCanvas = () => {
    clearCanvas()
    const { current: whiteboard } = canvasRef
    const context = whiteboard.getContext("2d")
    strokes.forEach((stroke) => {
      stroke.data.forEach(([lastX, lastY, currX, currY]) => {
        draw(context, { x: lastX, y: lastY }, { x: currX, y: currY })
      })
    })
  }

  React.useEffect(() => {
    refreshCanvas()
  }, [strokes])

  return (
    <HtmlCanvas
      ref={canvasRef}
      style={{ touchAction: isMultiFinger ? "auto" : "pinch-zoom" }}
      width={width}
      height={height}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchCancel={onTouchEnd}
    >
      {/* Need to do fallback */}
    </HtmlCanvas>
  )
}

export default CanvasElement
