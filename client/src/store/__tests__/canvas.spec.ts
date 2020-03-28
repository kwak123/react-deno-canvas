import { createStore, combineReducers, PreloadedState } from "@reduxjs/toolkit"
import canvasReducer, {
  initialState,
  CanvasStore,
  CanvasStroke,
} from "../canvas/reducers"
import { addStroke, undoStroke } from "../canvas/actions"

const getMockStore = (state = initialState) => {
  return createStore(canvasReducer, state as PreloadedState<CanvasStore>)
}

describe("canvas integration", () => {
  describe("addStroke", () => {
    it("should add line to strokes", () => {
      const store = getMockStore()
      const mockStroke: CanvasStroke = [[0, 0, 0, 0]]
      store.dispatch(addStroke(mockStroke))
      expect(store.getState()).toEqual({
        strokes: [mockStroke],
      })
    })

    it("should add line to end of lines", () => {
      const oldPath: CanvasStroke = [[0, 0, 0, 0]]
      const newPath: CanvasStroke = [[1, 1, 1, 1]]
      const state = { strokes: [oldPath] }
      const store = getMockStore(state)
      store.dispatch(addStroke(newPath))
      expect(store.getState()).toEqual({
        strokes: [oldPath, newPath],
      })
    })
  })

  describe("undoPath", () => {
    it("should undo existing line", () => {
      const oldStroke: CanvasStroke = [[0, 0, 0, 0]]
      const state = { strokes: [oldStroke] }
      const store = getMockStore(state)
      store.dispatch(undoStroke())
      expect(store.getState()).toEqual({
        strokes: [],
      })
    })

    it("should undo only the line", () => {
      const strokeToKeep: CanvasStroke = [[0, 0, 0, 0]]
      const strokeToRemove: CanvasStroke = [[1, 1, 1, 1]]
      const state = { strokes: [strokeToKeep, strokeToRemove] }
      const store = getMockStore(state)
      store.dispatch(undoStroke())
      expect(store.getState()).toEqual({
        strokes: [strokeToKeep],
      })
    })
  })
})
