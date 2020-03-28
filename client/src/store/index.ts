import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import canvasReducer, { CanvasStore } from "./canvas/reducers"

import service from "../services"

export interface GlobalState {
  canvas: CanvasStore
}

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    thunk.withExtraArgument(service),
  ],
})

export default store
