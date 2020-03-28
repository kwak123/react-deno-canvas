import { Reducer, Action } from "@reduxjs/toolkit"
import { CANVAS_ACTION, AddLineAction } from "./actions"

export interface CanvasStore {
  lines: string[]
}

export const initialState: CanvasStore = {
  lines: [],
}

const canvasReducer: Reducer<CanvasStore, Action> = (
  state = initialState,
  action: Action
) => {
  switch (action.type) {
    case CANVAS_ACTION.ADD_LINE:
      return {
        lines: [...state.lines, (action as AddLineAction).line],
      }
    case CANVAS_ACTION.UNDO_LINE: {
      const newLines = [...state.lines]
      newLines.pop()
      return {
        lines: newLines,
      }
    }
    default:
      return state
  }
}

export default canvasReducer
