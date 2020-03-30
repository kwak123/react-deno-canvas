import { ROOM_ACTION, SetRoomListAction } from "./actions"
import { RoomResponse } from "../../services/rooms"
import { Reducer } from "react"
import { AnyAction } from "@reduxjs/toolkit"

export interface RoomsStore {
  roomList: RoomResponse
}

const initialState: RoomsStore = {
  roomList: [],
}

const roomsReducer: Reducer<RoomsStore, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ROOM_ACTION.SET_ROOM_LIST:
      return {
        roomList: (action as SetRoomListAction).roomList,
      }
    default:
      return state
  }
}

export default roomsReducer
