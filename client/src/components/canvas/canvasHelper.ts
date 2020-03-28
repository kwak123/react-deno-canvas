import * as uuid from "uuid"
import {
  CanvasStroke,
  CanvasCoordinateTuple,
} from "../../store/canvas/reducers"

export class CanvasHelper {
  stroke: CanvasStroke

  start() {
    this.stroke = {
      id: uuid.v4(),
      data: [],
    }
  }

  append(canvasCoordinate: CanvasCoordinateTuple) {
    if (canvasCoordinate && this.stroke) {
      this.stroke.data.push(canvasCoordinate)
    }
  }

  close() {
    if (!this.stroke || !this.stroke.data.length) {
      return null
    }

    const finishedStroke = this.stroke
    this.stroke = null
    return finishedStroke
  }
}
