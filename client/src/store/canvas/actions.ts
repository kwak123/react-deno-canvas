import { Action, ActionCreator } from "@reduxjs/toolkit"

export enum CANVAS_ACTION {
  ADD_LINE,
  UNDO_LINE,
}

export interface AddLineAction extends Action<CANVAS_ACTION> {
  path: Path2D
}

export interface UndoLineAction extends Action<CANVAS_ACTION> {}

export const addPath: ActionCreator<AddLineAction> = (path: Path2D) => ({
  type: CANVAS_ACTION.ADD_LINE,
  path,
})

export const undoPath: ActionCreator<UndoLineAction> = () => ({
  type: CANVAS_ACTION.UNDO_LINE,
})
