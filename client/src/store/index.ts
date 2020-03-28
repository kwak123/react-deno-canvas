import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit"
import thunk from "redux-thunk"

import service from "../services"

const initialState = {}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({ thunk: false }),
    thunk.withExtraArgument(service),
  ],
})
export default store
