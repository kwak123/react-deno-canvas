import { Reducer, Action } from "@reduxjs/toolkit"
import { CANVAS_ACTION, AddLineAction, SetStrokesAction } from "./actions"

// lastX, lastY, currX, currY
export type CanvasCoordinateTuple = [number, number, number, number]

// export type CanvasStroke = CanvasCoordinateTuple[]

export interface CanvasStroke {
  id: string
  data: CanvasCoordinateTuple[]
}

export interface CanvasStore {
  strokes: CanvasStroke[]
  userStrokes: string[]
}

export const initialState: CanvasStore = {
  strokes: [],
  userStrokes: [],
}

const canvasReducer: Reducer<CanvasStore, Action> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case CANVAS_ACTION.ADD_STROKE:
      return {
        ...state,
        strokes: [...state.strokes, (action as AddLineAction).stroke],
        userStrokes: [
          ...state.userStrokes,
          (action as AddLineAction).stroke.id,
        ],
      }
    case CANVAS_ACTION.UNDO_STROKE: {
      const newUserStrokes = state.userStrokes.slice()
      // Highly naive
      newUserStrokes.pop()
      return {
        ...state,
        userStrokes: newUserStrokes,
      }
    }
    case CANVAS_ACTION.SET_STROKES:
      return {
        ...state,
        strokes: (action as SetStrokesAction).strokes,
      }
    default:
      return state
  }
}

export default canvasReducer
