import { Action, ActionCreator } from "@reduxjs/toolkit"

export enum CANVAS_ACTION {
  ADD_LINE,
  UNDO_LINE,
}

interface AddLineAction extends Action<CANVAS_ACTION> {
  line: string
}

interface UndoLineAction extends Action<CANVAS_ACTION> {}

export const addLine: ActionCreator<AddLineAction> = (line: string) => ({
  type: CANVAS_ACTION.ADD_LINE,
  line,
})

export const undoLine: ActionCreator<UndoLineAction> = () => ({
  type: CANVAS_ACTION.UNDO_LINE,
})
