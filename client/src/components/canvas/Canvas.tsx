import React, { useState, useRef, MouseEvent } from "react"

/* Adapted from https://stackoverflow.com/a/8398189 */
const Canvas = () => {
  const whiteboardRef = useRef<HTMLCanvasElement>(null)
  const [shouldDraw, setShouldDraw] = useState(false)
  const [isDot, setIsDot] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [currX, setCurrX] = useState(0)
  const [currY, setCurrY] = useState(0)

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(currX, currY)
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()
  }

  const onMouseDown = (event: MouseEvent) => {
    const { current: whiteboard } = whiteboardRef
    const ctx = whiteboard.getContext("2d")
    setLastX(currX)
    setLastY(currY)
    setCurrX(event.clientX - whiteboard.offsetLeft)
    setCurrY(event.clientY - whiteboard.offsetTop)
    setShouldDraw(true)
    setIsDot(true)

    if (isDot) {
      ctx.beginPath()
      ctx.fillStyle = "black"
      ctx.fillRect(currX, currY, 2, 2)
      ctx.closePath()
      setIsDot(false)
    }
  }

  const onMouseUp = () => {
    setShouldDraw(false)
    setLastX(currX)
    setLastY(currY)
  }

  const onMouseMove = (event: MouseEvent) => {
    const { current: whiteboard } = whiteboardRef
    if (shouldDraw) {
      setLastX(currX)
      setLastY(currY)
      setCurrX(event.clientX - whiteboard.offsetLeft)
      setCurrY(event.clientY - whiteboard.offsetTop)
      draw(whiteboard.getContext("2d"))
    }
  }

  return (
    <canvas
      ref={whiteboardRef}
      id="whiteboard"
      width="600"
      height="600"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseUp}
    >
      {/* Need to add fallback */}
    </canvas>
  )
}

export default Canvas
