import { Action, ActionCreator } from "@reduxjs/toolkit"
import { CanvasStroke } from "./reducers"

export enum CANVAS_ACTION {
  ADD_LINE,
  UNDO_LINE,
}

export interface AddLineAction extends Action<CANVAS_ACTION> {
  stroke: CanvasStroke
}

export interface UndoLineAction extends Action<CANVAS_ACTION> {}

export const addStroke: ActionCreator<AddLineAction> = (
  stroke: CanvasStroke
) => ({
  type: CANVAS_ACTION.ADD_LINE,
  stroke,
})

export const undoStroke: ActionCreator<UndoLineAction> = () => ({
  type: CANVAS_ACTION.UNDO_LINE,
})
