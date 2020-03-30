import {
  createStore,
  combineReducers,
  ThunkAction,
  Action,
  applyMiddleware,
  compose,
} from "@reduxjs/toolkit"
import thunk, { ThunkDispatch } from "redux-thunk"

import canvasReducer, { CanvasStore } from "./canvas/reducers"
import roomsReducer, { RoomsStore } from "./rooms/reducers"

export interface GlobalState {
  canvas: CanvasStore
  rooms: RoomsStore
}

export type ServiceThunkResult<R> = ThunkAction<
  R,
  GlobalState,
  undefined,
  Action
>
export type ServiceThunkDispatch = ThunkDispatch<GlobalState, undefined, Action>

const rootReducer = combineReducers({
  canvas: canvasReducer,
  rooms: roomsReducer,
})
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
