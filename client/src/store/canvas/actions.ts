import { Action, ActionCreator } from "@reduxjs/toolkit"
import { CanvasStroke } from "./reducers"
import { ServiceThunkResult } from "../index"

export enum CANVAS_ACTION {
  ADD_LINE,
  UNDO_LINE,
  SET_STROKES,
}

export interface AddLineAction extends Action<CANVAS_ACTION> {
  stroke: CanvasStroke
}

export interface UndoLineAction extends Action<CANVAS_ACTION> {}

export interface SetStrokesAction extends Action<CANVAS_ACTION> {
  strokes: CanvasStroke[]
}

export type SendStrokeServiceAction = (
  stroke: CanvasStroke
) => ServiceThunkResult<any>

export const sendStrokeToService: SendStrokeServiceAction = (stroke) => (
  dispatch,
  getState,
  service
) => {
  service.socketService.sendMessage(stroke)
  return dispatch(addStroke(stroke))
}

export const addStroke: ActionCreator<AddLineAction> = (
  stroke: CanvasStroke
) => ({
  type: CANVAS_ACTION.ADD_LINE,
  stroke,
})

export const undoStroke: ActionCreator<UndoLineAction> = () => ({
  type: CANVAS_ACTION.UNDO_LINE,
})

export const setStrokes: ActionCreator<SetStrokesAction> = (
  strokes: CanvasStroke[]
) => ({
  type: CANVAS_ACTION.SET_STROKES,
  strokes,
})
