import socketIoClient from 'socket.io-client'
let socket

export const SET_ROOM_SUCCESS = 'skeleton-card/redux/ducks/socket/SET_ROOM_SUCCESS'
export const SET_ROOM_PENDING = 'skeleton-card/redux/ducks/socket/SET_ROOM_PENDING'
export const SET_ROOM_FAIL = 'skeleton-card/redux/ducks/socket/SET_ROOM_FAIL'

export const CONNECT_CLIENT_PENDING = 'skeleton-card/redux/ducks/socket/CONNECT_CLIENT_PENDING'
export const CONNECT_CLIENT_SUCCESS = 'skeleton-card/redux/ducks/socket/CONNECT_CLIENT_SUCCESS'
export const CONNECT_CLIENT_FAIL = 'skeleton-card/redux/ducks/socket/CONNECT_CLIENT_FAIL'

export default function reducer(state = { client: [] }, action) {
  switch (action.type) {
  case SET_ROOM_PENDING:
    return { ...state, setRoomPending: true }
  case SET_ROOM_SUCCESS:
    return { ...state, setRoomPending: false, room: action.payload }
  case SET_ROOM_FAIL:
    return { ...state, error: action.error }
  case CONNECT_CLIENT_PENDING:
    return { ...state, connectSocketClientPending: true }
  case CONNECT_CLIENT_SUCCESS:
    return { ...state, connectSocketClientPending: false, client: action.payload }
  case CONNECT_CLIENT_FAIL:
    return {
      ...state,
      connectSocketClientPending: false,
      error: action.error
    }
  default:
    return state
  }
}

export const setRoomSuccess = () => {
  return {
    type: SET_ROOM_SUCCESS
  }
}
export const setRoomPending = () => {
  return {
    type: SET_ROOM_PENDING
  }
}

export const setRoomFail = (error) => {
  return {
    type: SET_ROOM_FAIL,
    error: error
  }
}

export const connectClientPending = () => {
  return {
    type: CONNECT_CLIENT_PENDING
  }
}

export const connectClientSuccess = client => {
  return {
    type: CONNECT_CLIENT_SUCCESS,
    payload: client
  }
}

export const connectClientFail = error => {
  return {
    type: CONNECT_CLIENT_FAIL,
    error: error
  }
}

// export const logoutUser = () => async dispatch => {
//   dispatch(logoutPending())
//   window.localStorage.removeItem('loggedUser')
//   dispatch(logoutSuccess())
// }
export const setRoomName = roomName => async dispatch => {
  dispatch(setRoomPending())
  socket.emit('room', roomName)
}

export const connectClient = () => async dispatch => {
  dispatch(connectClientPending())
  socket = socketIoClient('http://localhost:3003')
  socket.on('client connected', clientId => dispatch(connectClientSuccess(clientId)))
}
