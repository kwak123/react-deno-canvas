import { Action, ActionCreator } from "@reduxjs/toolkit"
import { CanvasStroke } from "./reducers"
import { ServiceThunkResult } from "../index"

export enum CANVAS_ACTION {
  ADD_STROKE,
  UNDO_STROKE,
  SET_STROKES,
}

export interface AddLineAction extends Action<CANVAS_ACTION> {
  stroke: CanvasStroke
}

export interface UndoLineAction extends Action<CANVAS_ACTION> {
  id: string
}

export interface SetStrokesAction extends Action<CANVAS_ACTION> {
  strokes: CanvasStroke[]
}

export const sendStrokeToService: (
  stroke: CanvasStroke
) => ServiceThunkResult<any> = (stroke) => (dispatch, getState, service) => {
  service.socketService.sendMessage(stroke)
  return dispatch(addStroke(stroke))
}

export const undoStrokeFromService: () => ServiceThunkResult<any> = () => (
  dispatch,
  getState,
  service
) => {
  const userStrokes = getState().canvas.userStrokes
  const lastUserMessageId = userStrokes[userStrokes.length - 1]
  service.socketService.sendMessage({
    id: lastUserMessageId,
    delete: true,
  })
  return dispatch(undoStroke())
}

const addStroke: ActionCreator<AddLineAction> = (stroke: CanvasStroke) => ({
  type: CANVAS_ACTION.ADD_STROKE,
  stroke,
})

const undoStroke: ActionCreator<UndoLineAction> = (id: string) => ({
  type: CANVAS_ACTION.UNDO_STROKE,
  id,
})

export const setStrokes: ActionCreator<SetStrokesAction> = (
  strokes: CanvasStroke[]
) => ({
  type: CANVAS_ACTION.SET_STROKES,
  strokes,
})
