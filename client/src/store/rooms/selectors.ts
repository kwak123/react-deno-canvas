import { GlobalState } from ".."

export const selectRoomList = (state: GlobalState) => state.rooms.roomList
export const selectRoomLoading = (state: GlobalState) => state.rooms.loading
