import {
  createStore,
  applyMiddleware,
  PreloadedState,
  combineReducers,
} from "@reduxjs/toolkit"
import thunk, { ThunkDispatch } from "redux-thunk"
import canvasReducer, { CanvasStroke, CanvasStore } from "../canvas/reducers"
import { sendStrokeToService, undoStrokeFromService } from "../canvas/actions"
import services from "../../services"

jest.mock("../../services")

const getMockStore = (state = {}) => {
  return createStore(
    canvasReducer,
    state as PreloadedState<CanvasStore>,
    applyMiddleware(thunk)
  )
}

xdescribe("canvas integration", () => {
  describe("addStroke", () => {
    it("should add line to strokes", () => {
      const store = getMockStore()
      const mockStroke: CanvasStroke = { id: "1", data: [[0, 0, 0, 0]] }
      store.dispatch(sendStrokeToService(mockStroke))
      expect(store.getState()).toEqual({
        canvas: {
          strokes: [mockStroke],
          userStrokes: [mockStroke.id],
        },
      })
    })

    it("should add line to end of lines", () => {
      const oldPath: CanvasStroke = { id: "1", data: [[0, 0, 0, 0]] }
      const newPath: CanvasStroke = { id: "2", data: [[1, 1, 1, 1]] }
      const state: CanvasStore = {
        strokes: [oldPath],
        userStrokes: [oldPath.id],
      }
      const store = getMockStore(state)
      store.dispatch(sendStrokeToService(newPath))
      expect(store.getState()).toEqual({
        canvas: {
          strokes: [oldPath, newPath],
          userStrokes: [oldPath.id, newPath.id],
        },
      })
    })
  })

  describe("undoPath", () => {
    it("should undo existing line", () => {
      const oldStroke: CanvasStroke = { id: "1", data: [[0, 0, 0, 0]] }
      const state: CanvasStore = {
        strokes: [],
        userStrokes: [oldStroke.id],
      }
      const store = getMockStore(state)
      store.dispatch(undoStrokeFromService())
      expect(store.getState()).toEqual({
        canvas: {
          strokes: [],
          userStrokes: [],
        },
      })
    })

    it("should undo only the line", () => {
      const strokeToKeep: CanvasStroke = { id: "1", data: [[0, 0, 0, 0]] }
      const strokeToRemove: CanvasStroke = { id: "2", data: [[1, 1, 1, 1]] }
      const state: CanvasStore = {
        strokes: [],
        userStrokes: [strokeToKeep.id, strokeToRemove.id],
      }
      const store = getMockStore(state)
      store.dispatch(undoStrokeFromService())
      expect(store.getState()).toEqual({
        canvas: {
          strokes: [],
          userStrokes: [strokeToKeep.id],
        },
      })
    })
  })
})
