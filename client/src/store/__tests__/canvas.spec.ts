import {
  createStore,
  applyMiddleware,
  PreloadedState,
  combineReducers,
} from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import canvasReducer, { CanvasStroke } from "../canvas/reducers"
import { sendStrokeToService, undoStrokeFromService } from "../canvas/actions"

import { AppService } from "../../services"
import { GlobalState } from "../"

const getMockService: () => AppService = () => ({
  socketService: {
    socket: null,
    initializeSocket: jest.fn(),
    sendMessage: jest.fn(),
    closeSocket: jest.fn(),
  },
  roomsService: {
    getRooms: jest.fn().mockResolvedValue(null),
    getRoom: jest.fn().mockResolvedValue(null),
  },
})

const getMockStore = (state = {}) => {
  const mockService = getMockService()
  return createStore(
    combineReducers({
      canvas: canvasReducer,
    }),
    state as PreloadedState<GlobalState>,
    applyMiddleware(thunk.withExtraArgument(mockService))
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
      const state: GlobalState = {
        canvas: {
          strokes: [oldPath],
          userStrokes: [oldPath.id],
        },
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
      const state: GlobalState = {
        canvas: {
          strokes: [],
          userStrokes: [oldStroke.id],
        },
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
      const state: GlobalState = {
        canvas: {
          strokes: [],
          userStrokes: [strokeToKeep.id, strokeToRemove.id],
        },
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
