import { Action, ActionCreator } from "@reduxjs/toolkit"
import { ServiceThunkResult } from "../index"

import services from "../../services"

export enum ROOM_ACTION {
  FETCH_ROOM_LIST = "FETCH_ROOM_LIST",
  SET_ROOM_LIST = "SET_ROOM_LIST",
}

export interface FetchRoomListAction extends Action {}

export interface SetRoomListAction extends Action<ROOM_ACTION> {
  roomList: any
}

export const fetchRoomList: () => ServiceThunkResult<any> = () => (
  dispatch,
  getState
) => {
  return services.roomsService
    .getRooms()
    .then((roomList) => {
      dispatch(setRoomList(roomList))
    })
    .catch((e) => {
      console.error(e)
      dispatch(setRoomList([]))
    })
}

const setRoomList: ActionCreator<SetRoomListAction> = (roomList: any) => ({
  type: ROOM_ACTION.SET_ROOM_LIST,
  roomList,
})
