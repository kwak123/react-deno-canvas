import { Reducer, Action } from "@reduxjs/toolkit"
import { CANVAS_ACTION, AddLineAction, SetStrokesAction } from "./actions"

// lastX, lastY, currX, currY
export type CanvasCoordinateTuple = [number, number, number, number]

export type CanvasStroke = CanvasCoordinateTuple[]

export interface CanvasStore {
  strokes: CanvasStroke[]
}

export const initialState: CanvasStore = {
  strokes: [],
}

const canvasReducer: Reducer<CanvasStore, Action> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case CANVAS_ACTION.ADD_LINE:
      return {
        strokes: [...state.strokes, (action as AddLineAction).stroke],
      }
    case CANVAS_ACTION.UNDO_LINE: {
      const newStrokes = [...state.strokes]
      newStrokes.pop()
      return {
        strokes: newStrokes,
      }
    }
    case CANVAS_ACTION.SET_STROKES:
      return {
        strokes: (action as SetStrokesAction).strokes,
      }
    default:
      return state
  }
}

export default canvasReducer
