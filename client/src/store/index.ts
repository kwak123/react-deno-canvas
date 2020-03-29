import {
  createStore,
  combineReducers,
  getDefaultMiddleware,
  ThunkAction,
  Action,
  applyMiddleware,
  compose,
} from "@reduxjs/toolkit"
import thunk, { ThunkDispatch } from "redux-thunk"

import canvasReducer, { CanvasStore } from "./canvas/reducers"

import service, { AppService } from "../services"

export interface GlobalState {
  canvas: CanvasStore
}

export type ServiceThunkResult<R> = ThunkAction<
  R,
  GlobalState,
  AppService,
  Action
>
export type ServiceThunkDispatch = ThunkDispatch<
  GlobalState,
  AppService,
  Action
>

const rootReducer = combineReducers({
  canvas: canvasReducer,
})
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(service))
    // (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    //   (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
