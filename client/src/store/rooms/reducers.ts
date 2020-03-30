import { AnyAction, Reducer } from "@reduxjs/toolkit"
import { ROOM_ACTION, SetRoomListAction } from "./actions"
// import { ROOM_ACTION } from "../canvas/actions"
import { RoomResponse } from "../../services/rooms"

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
    // I HAVE NO IDEA WHY THIS IS HAPPENING
    case ROOM_ACTION?.SET_ROOM_LIST:
      return {
        roomList: (action as SetRoomListAction).roomList,
      }
    default:
      return state
  }
}

export default roomsReducer
