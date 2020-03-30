import { Action, ActionCreator } from "@reduxjs/toolkit"
import { ServiceThunkResult } from "../index"

import services from "../../services"

export enum ROOM_ACTION {
  START_ROOM_FETCH = "START_ROOM_FETCH",
  FETCH_ROOM_LIST = "FETCH_ROOM_LIST",
  SET_ROOM_LIST = "SET_ROOM_LIST",
  ROOM_FETCH_ERROR = "SET_ROOM_ERROR",
}

export interface StartRoomFetchAction extends Action {}
export interface FetchRoomListAction extends Action {}

export interface SetRoomListAction extends Action<ROOM_ACTION> {
  roomList: any
}

export interface RoomFetchErrorAction extends Action {
  error: string
}

export const fetchRoomList: () => ServiceThunkResult<any> = () => (
  dispatch,
  getState
) => {
  dispatch(startRoomFetch())
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

export const startRoomFetch: ActionCreator<StartRoomFetchAction> = () => ({
  type: ROOM_ACTION.START_ROOM_FETCH,
})

const setRoomList: ActionCreator<SetRoomListAction> = (roomList: any) => ({
  type: ROOM_ACTION.SET_ROOM_LIST,
  roomList,
})

const setRoomError: ActionCreator<RoomFetchErrorAction> = (error: string) => ({
  type: ROOM_ACTION.ROOM_FETCH_ERROR,
  error,
})
