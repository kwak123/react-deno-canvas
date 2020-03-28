import React, { useState, useRef, MouseEvent } from "react"

interface Position {
  x: number
  y: number
}

/* Adapted from https://stackoverflow.com/a/8398189 */
const Canvas = () => {
  const whiteboardRef = useRef<HTMLCanvasElement>(null)
  const [shouldDraw, setShouldDraw] = useState(false)
  const [isDot, setIsDot] = useState(false)
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

  const onMouseDown = (event: MouseEvent) => {
    const { current: whiteboard } = whiteboardRef
    const ctx = whiteboard.getContext("2d")
    // Need to move x/y here
    const newX = event.clientX - whiteboard.offsetLeft
    const newY = event.clientY - whiteboard.offsetTop
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

  const onMouseUp = (event: MouseEvent) => {
    setShouldDraw(false)
  }

  const onMouseMove = (event: MouseEvent) => {
    const { current: whiteboard } = whiteboardRef
    if (shouldDraw) {
      const { x: currX, y: currY } = curr
      const newX = event.clientX - whiteboard.offsetLeft
      const newY = event.clientY - whiteboard.offsetTop
      setLast({ x: currX, y: currY })
      setCurr({ x: newX, y: newY })
    }
  }

  const onTouchStart = () => {
    setShouldDraw(true)
  }
  const onTouchEnd = () => {
    setShouldDraw(false)
  }
  const onTouchMove = () => {}

  React.useEffect(() => {
    const { current: whiteboard } = whiteboardRef
    draw(whiteboard.getContext("2d"))
  }, [curr])

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
