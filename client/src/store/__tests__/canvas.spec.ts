import { createStore, combineReducers, PreloadedState } from "@reduxjs/toolkit"
import canvasReducer, { initialState, CanvasStore } from "../canvas/reducers"
import { addPath, undoPath } from "../canvas/actions"

const getMockStore = (state = initialState) => {
  return createStore(canvasReducer, state as PreloadedState<CanvasStore>)
}

describe("canvas integration", () => {
  describe("addPath", () => {
    it("should add line to paths", () => {
      const store = getMockStore()
      const mockPath = new Path2D()
      store.dispatch(addPath(mockPath))
      expect(store.getState()).toEqual({
        paths: [mockPath],
      })
    })

    it("should add line to end of lines", () => {
      const oldPath = new Path2D()
      const newPath = new Path2D()
      const state = { paths: [oldPath] }
      const store = getMockStore(state)
      store.dispatch(addPath(newPath))
      expect(store.getState()).toEqual({
        paths: [oldPath, newPath],
      })
    })
  })

  describe("undoPath", () => {
    it("should undo existing line", () => {
      const oldPath = new Path2D()
      const state = { paths: [oldPath] }
      const store = getMockStore(state)
      store.dispatch(undoPath())
      expect(store.getState()).toEqual({
        paths: [],
      })
    })

    it("should undo only the line", () => {
      const pathToKeep = new Path2D()
      const pathToRemove = new Path2D()
      const state = { paths: [pathToKeep, pathToRemove] }
      const store = getMockStore(state)
      store.dispatch(undoPath())
      expect(store.getState()).toEqual({
        paths: [pathToKeep],
      })
    })
  })
})
