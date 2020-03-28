import { Reducer, Action } from "@reduxjs/toolkit"
import { CANVAS_ACTION, AddLineAction } from "./actions"

export interface CanvasStore {
  paths: Path2D[]
}

export const initialState: CanvasStore = {
  paths: [],
}

const canvasReducer: Reducer<CanvasStore, Action> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case CANVAS_ACTION.ADD_LINE:
      return {
        paths: [...state.paths, (action as AddLineAction).path],
      }
    case CANVAS_ACTION.UNDO_LINE: {
      const newPaths = [...state.paths]
      newPaths.pop()
      return {
        paths: newPaths,
      }
    }
    default:
      return state
  }
}

export default canvasReducer
