import { AnyAction, Reducer } from "@reduxjs/toolkit"
import { ROOM_ACTION, SetRoomListAction, RoomFetchErrorAction } from "./actions"
// import { ROOM_ACTION } from "../canvas/actions"
import { RoomResponse } from "../../services/rooms"

export interface RoomsStore {
  roomList: RoomResponse
  loading: boolean
  error: string
}

const initialState: RoomsStore = {
  roomList: [],
  loading: false,
  error: null,
}

const roomsReducer: Reducer<RoomsStore, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ROOM_ACTION?.START_ROOM_FETCH:
      return {
        ...state,
        loading: true,
        error: null,
      }
    // I HAVE NO IDEA WHY THIS IS HAPPENING
    case ROOM_ACTION?.SET_ROOM_LIST:
      return {
        ...state,
        roomList: (action as SetRoomListAction).roomList,
        loading: false,
        error: null,
      }

    case ROOM_ACTION?.ROOM_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: (action as RoomFetchErrorAction).error,
      }

    default:
      return state
  }
}

export default roomsReducer
