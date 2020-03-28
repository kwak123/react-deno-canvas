import React from "react"

const Canvas = () => {
  const whiteboard = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const ctx = whiteboard.current.getContext("2d")
    ctx.beginPath()
    ctx.moveTo(100, 100)
    ctx.fill()
  })

  const onMouseDown = () => {
    /* Start drawing */
  }
  const onMouseUp = () => {
    /* Stop drawing */
  }
  const onMouseMove = () => {
    /* Draw */
  }

  return (
    <canvas
      ref={whiteboard}
      id="whiteboard"
      width="600"
      height="600"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseUp}
    ></canvas>
  )
}

export default Canvas
