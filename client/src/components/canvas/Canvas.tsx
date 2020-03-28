import React from "react"

const Canvas = () => {
  const whiteboard = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const ctx = whiteboard.current.getContext("2d")
    ctx.fillRect(10, 10, 50, 50)
  })

  return (
    <canvas ref={whiteboard} id="whiteboard" width="600" height="600"></canvas>
  )
}

export default Canvas
