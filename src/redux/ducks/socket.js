import socketIoClient from 'socket.io-client'
import { setRoomForSession, clearRoomForSession } from './session'
let socket

export const SET_ROOM_SUCCESS = 'skeleton-card/redux/ducks/socket/SET_ROOM_SUCCESS'
export const SET_ROOM_PENDING = 'skeleton-card/redux/ducks/socket/SET_ROOM_PENDING'
export const SET_ROOM_FAIL = 'skeleton-card/redux/ducks/socket/SET_ROOM_FAIL'
export const SET_ROOM_STATE = 'skeleton-card/redux/ducks/socket/SET_ROOM_STATE'

export const DISPATCH_LEAVE_ROOM_TO_SOCKET = 'server/DISPATCH_LEAVE_ROOM_TO_SOCKET'
export const LEAVE_ROOM_FAIL = 'skeleton-card/redux/ducks/socket/LEAVE_ROOM_FAIL'
export const LEAVE_ROOM_PENDING = 'skeleton-card/redux/ducks/socket/LEAVE_ROOM_PENDING'
export const LEAVE_ROOM_SUCCESS = 'skeleton-card/redux/ducks/socket/LEAVE_ROOM_SUCCESS'

export const SET_CLIENTS_IN_ROOM = 'skeleton-card/redux/ducks/socket/SET_CLIENTS_IN_ROOM'
export const SET_SOCKET_USER = 'skeleton-card/redux/ducks/socket/SET_USER_NAME'

export const DISPERSE_ROOM_MESSAGE = 'skeleton-card/redux/ducks/socket/DISPERSE_ROOM_MESSAGE'
export const SET_SOCKET_STATE = 'skeleton-card/redux/ducks/socket/SET_SOCKET_STATE'
export const SET_SOCKET_ROOM_STATE = 'skeleton-card/redux/ducks/socket/SET_SOCKET_ROOM_STATE'
export const SET_AVAILABLE_ROOMS = 'skeleton-card/redux/ducks/socket/SET_AVAILABLE_ROOMS'

export const CONNECT_CLIENT_PENDING = 'skeleton-card/redux/ducks/socket/CONNECT_CLIENT_PENDING'
export const CONNECT_CLIENT_SUCCESS = 'skeleton-card/redux/ducks/socket/CONNECT_CLIENT_SUCCESS'
export const CONNECT_CLIENT_FAIL = 'skeleton-card/redux/ducks/socket/CONNECT_CLIENT_FAIL'

export default function reducer(state = { client: [], messages: [] }, action) {
  switch (action.type) {
  case LEAVE_ROOM_SUCCESS:
    return { ...state, room: null, currentClientsInRoom: null, socket: action.payload }
  case SET_ROOM_PENDING:
    return { ...state, setRoomPending: true }
  case SET_ROOM_SUCCESS:
    return { ...state, setRoomPending: false, room: action.payload }
  case SET_ROOM_FAIL:
    return { ...state, error: action.error }
  case SET_ROOM_STATE:
    return { ...state, room: action.payload }
  case DISPERSE_ROOM_MESSAGE:
    console.log('dispersing message to room')
    return { ...state, messages: [...state.messages, action.payload] }
  case SET_AVAILABLE_ROOMS:
    console.log(action.payload)
    return { ...state, availableRooms: action.payload }
  case SET_SOCKET_STATE:
    console.log('hit the reducer for set socket state')
    return { ...state, socket: { ...action.payload }  }
  case SET_CLIENTS_IN_ROOM:
    return { ...state, currentClientsInRoom: action.payload }
  case SET_SOCKET_ROOM_STATE:
    return { ...state, socket: { ...state.socket, socketRooms: action.payload } }
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

export const leaveRoomSuccess = socket => {
  return {
    type: LEAVE_ROOM_SUCCESS,
    payload: socket
  }
}

export const dispatchLeaveRoomToSocket = roomName => {
  return {
    type: DISPATCH_LEAVE_ROOM_TO_SOCKET,
    payload: roomName
  }
}

export const leaveRoom = roomName => dispatch => {
  dispatch(leaveRoomPending())
  try {
    dispatch(dispatchLeaveRoomToSocket(roomName))
    dispatch(clearRoomForSession())
  } catch (error){
    dispatch(leaveRoomFail(error))
  }
}
export const setRoomSuccess = () => {
  return {
    type: SET_ROOM_SUCCESS
  }
}

export const leaveRoomFail = error => {
  return {
    type: LEAVE_ROOM_FAIL,
    payload: error
  }
}

export const leaveRoomPending = () => {
  return {
    type: LEAVE_ROOM_PENDING,
  }
}

export const setSocketUser = user => {
  return {
    type: 'server/SET_SOCKET_USER',
    payload: { username: user.username, id: user.id, token: user.token ? true : false }
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

export const setRoomState = roomName => {
  console.log('setting room state')
  return {
    type: SET_ROOM_STATE,
    payload: roomName
  }
}

export const setSocketState = (socket) => {
  console.log('socket:', socket)
  return {
    type: SET_SOCKET_STATE,
    payload: socket
  }
}

export const connectClientPending = () => {
  return {
    type: CONNECT_CLIENT_PENDING
  }
}

export const disperseRoomMessage = (message) => {
  return {
    type: 'DISPERSE_ROOM_MESSAGE',
    payload: message
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

export const dispatchRoomToSocket = roomName => {
  console.log(roomName)
  return {
    type: 'server/SET_ROOM',
    payload: roomName
  }
}

// export const dispatchRoomToState = roomName => {
//   return {
//     type: SET_ROOM,

//   }
// }

export const dispatchRoomMessage = (roomName, message) => {
  return {
    type: 'server/SEND_ROOM_MESSAGE',
    payload: {
      roomName: roomName,
      message: message
    }
  }
}

// export const logoutUser = () => async dispatch => {
//   dispatch(logoutPending())
//   window.localStorage.removeItem('loggedUser')
//   dispatch(logoutSuccess())
// }
export const setRoomName = roomName => dispatch => {
  // socket.emit('set room', roomName)
  dispatch(setRoomState(roomName))
  dispatch(dispatchRoomToSocket(roomName))
  dispatch(setRoomForSession(roomName))
}


export const connectClient = () => async dispatch => {
  dispatch(connectClientPending())
  socket = socketIoClient('http://localhost:3003')
  socket.on('client connected', clientId => dispatch(connectClientSuccess(clientId)))
}
