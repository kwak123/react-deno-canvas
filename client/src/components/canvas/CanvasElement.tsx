import React, { useState, useRef, MouseEvent, TouchEvent } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"

import HeartSpinner from "../loadingSpinner/HeartSpinner"
import { CanvasStroke } from "../../store/canvas/reducers"
import { COLORS } from "../styling"

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
  // height: number
  // width: number
  scale?: number
  strokes: CanvasStroke[]
  allowDrawing?: boolean
  showSpinner?: boolean
}

const HtmlCanvas = styled.canvas``

const SpinnerContainer = styled.div`
  position: absolute;
`

const defaultWidth = 1320
const defaultHeight = 720

const CanvasElement: React.FC<CanvasElementProps> = ({
  handleDrawStart,
  handleDrawMove,
  handleDrawStop,
  // height,
  // width,
  scale = 1,
  strokes,
  allowDrawing = true,
  showSpinner = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [shouldDraw, setShouldDraw] = useState(false)
  const [isMultiFinger, setIsMultiFinger] = useState(false)
  const [last, setLast] = useState<Position>({ x: 0, y: 0 })
  const [curr, setCurr] = useState<Position>({ x: 0, y: 0 })

  const drawStart = ({ x: clientX, y: clientY }: Position) => {
    // The huge parentElement hardcode locks us into the existing dom tree, need to explore how to fix
    if (allowDrawing) {
      const { current: whiteboard } = canvasRef
      const newX =
        clientX -
        whiteboard.offsetLeft +
        whiteboard.parentElement.parentElement.parentElement.scrollLeft
      const newY =
        clientY -
        whiteboard.offsetTop +
        whiteboard.parentElement.parentElement.parentElement.scrollTop
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
      const newX =
        clientX -
        whiteboard.offsetLeft +
        whiteboard.parentElement.parentElement.parentElement.scrollLeft
      const newY =
        clientY -
        whiteboard.offsetTop +
        whiteboard.parentElement.parentElement.parentElement.scrollTop
      setLast({ x: currX, y: currY })
      setCurr({ x: newX, y: newY })
      draw(whiteboard.getContext("2d"), last, curr)

      handleDrawMove({ lastX: currX, lastY: currY, currX: newX, currY: newY })
    }
  }

  const drawStop = () => {
    if (allowDrawing) {
      handleDrawStop({})
    }
  }

  const onMouseDown = (event: MouseEvent) => {
    drawStart({
      x: event.pageX,
      y: event.pageY,
    })
  }

  const onMouseUp = (event: MouseEvent) => {
    setShouldDraw(false)
    drawStop()
  }

  const onMouseMove = (event: MouseEvent) => {
    if (shouldDraw && !isMultiFinger) {
      drawMove({
        x: event.pageX,
        y: event.pageY,
      })
    }
  }

  const onTouchStart = (event: TouchEvent) => {
    if (event.touches.length > 1) {
      setIsMultiFinger(true)
      setShouldDraw(false)
    } else {
      setShouldDraw(true)
      drawStart({
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      })
    }
  }
  const onTouchEnd = (event: TouchEvent) => {
    setIsMultiFinger(false)
    setShouldDraw(false)
    drawStop()
  }

  const onTouchMove = (event: TouchEvent) => {
    if (!isMultiFinger) {
      drawMove({
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      })
    }
  }

  const clearCanvas = () => {
    const context = canvasRef.current.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, defaultWidth, defaultHeight)
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
        const scaledLastX = Math.floor(lastX * scale)
        const scaledLastY = Math.floor(lastY * scale)
        const scaledcurrX = Math.floor(currX * scale)
        const scaledCurrY = Math.floor(currY * scale)
        draw(
          context,
          { x: scaledLastX, y: scaledLastY },
          { x: scaledcurrX, y: scaledCurrY }
        )
      })
    })
  }

  React.useEffect(() => {
    clearCanvas()
  }, [])

  React.useEffect(() => {
    refreshCanvas()
  }, [strokes])

  return (
    <>
      <HtmlCanvas
        ref={canvasRef}
        style={{
          touchAction: isMultiFinger ? "auto" : "pinch-zoom",
          marginRight: allowDrawing ? "24px" : 0,
        }}
        width={Math.floor(defaultWidth * scale)}
        height={Math.floor(defaultHeight * scale)}
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
      {showSpinner && (
        <SpinnerContainer>
          <HeartSpinner backgroundColor={COLORS.BLACK_NEAR} />
        </SpinnerContainer>
      )}
    </>
  )
}

export default CanvasElement
