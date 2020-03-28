import React, { useState, useRef, MouseEvent, TouchEvent } from "react"
import styled from "styled-components"

interface Position {
  x: number
  y: number
}

const HtmlCanvas = styled.canvas``

/* Adapted from https://stackoverflow.com/a/8398189 */
const Canvas = () => {
  const whiteboardRef = useRef<HTMLCanvasElement>(null)
  const [shouldDraw, setShouldDraw] = useState(false)
  const [isDot, setIsDot] = useState(false)
  const [isMultiFinger, setIsMultiFinger] = useState(false)
  const [last, setLast] = useState<Position>({ x: 0, y: 0 })
  const [curr, setCurr] = useState<Position>({ x: 0, y: 0 })

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    const { x: lastX, y: lastY } = last
    const { x: currX, y: currY } = curr
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(currX, currY)
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()
  }

  const handleStartDraw = ({
    clientX,
    clientY,
  }: {
    clientX: number
    clientY: number
  }) => {
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
  }

  const onMouseDown = (event: MouseEvent) => {
    handleStartDraw({
      clientX: event.clientX,
      clientY: event.clientY,
    })
  }

  const onMouseUp = (event: MouseEvent) => {
    setShouldDraw(false)
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

  React.useEffect(() => {
    const { current: whiteboard } = whiteboardRef
    draw(whiteboard.getContext("2d"))
  }, [curr])

  return (
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
  )
}

export default Canvas
