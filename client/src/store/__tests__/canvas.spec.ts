import { createStore, combineReducers, PreloadedState } from "@reduxjs/toolkit"
import canvasReducer, { initialState, CanvasStore } from "../canvas/reducers"
import { addLine, undoLine } from "../canvas/actions"

const getMockStore = (state = initialState) => {
  return createStore(canvasReducer, state as PreloadedState<CanvasStore>)
}

describe("canvas integration", () => {
  describe("addLine", () => {
    it("should add line to lines", () => {
      const store = getMockStore()
      const mockLine = new Path2D()
      store.dispatch(addLine(mockLine))
      expect(store.getState()).toEqual({
        lines: [mockLine],
      })
    })

    it("should add line to end of lines", () => {
      const oldLine = new Path2D()
      const newLine = new Path2D()
      const state = { lines: [oldLine] }
      const store = getMockStore(state)
      store.dispatch(addLine(newLine))
      expect(store.getState()).toEqual({
        lines: [oldLine, newLine],
      })
    })
  })

  describe("undoLine", () => {
    it("should undo existing line", () => {
      const existingLine = new Path2D()
      const state = { lines: [existingLine] }
      const store = getMockStore(state)
      store.dispatch(undoLine())
      expect(store.getState()).toEqual({
        lines: [],
      })
    })

    it("should undo only the line", () => {
      const lineToKeep = new Path2D()
      const lineToRemove = new Path2D()
      const state = { lines: [lineToKeep, lineToRemove] }
      const store = getMockStore(state)
      store.dispatch(undoLine())
      expect(store.getState()).toEqual({
        lines: [lineToKeep],
      })
    })
  })
})
