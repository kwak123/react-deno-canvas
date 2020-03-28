import { CanvasStroke, CanvasCoordinate } from "../../store/canvas/reducers"

export class CanvasHelper {
  stroke: CanvasStroke

  start() {
    this.stroke = []
  }

  append(canvasCoordinate: CanvasCoordinate) {
    if (this.stroke) {
      this.stroke.push(canvasCoordinate)
    }
  }

  close() {
    if (!this.stroke || !this.stroke.length) {
      return null
    }

    const finishedStroke = this.stroke
    this.stroke = null
    return finishedStroke
  }
}
