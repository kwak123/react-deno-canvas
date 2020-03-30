import { Action, ActionCreator } from "@reduxjs/toolkit"
import { RoomResponse } from "../../services/rooms"
import { ServiceThunkResult } from ".."
import services from "../../services"

export enum ROOM_ACTION {
  SET_ROOM_LIST = "SET_ROOM_LIST",
}

export interface SetRoomListAction extends Action<ROOM_ACTION> {
  roomList: RoomResponse
}

export const setRoomList: ActionCreator<SetRoomListAction> = (
  roomList: RoomResponse
) => ({
  type: ROOM_ACTION.SET_ROOM_LIST,
  roomList,
})
