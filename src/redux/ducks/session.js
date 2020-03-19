
export const START_GAME = 'skeleton-card/redux/ducks/session/START_GAME'
export const START_GAME_PENDING = 'skeleton-card/redux/ducks/session/START_GAME_PENDING'
export const START_GAME_SUCCESS = 'skeleton-card/redux/ducks/session/START_GAME_SUCCESS'
export const START_GAME_FAIL = 'skeleton-card/redux/ducks/session/START_GAME_FAIL'

export const DISPATCH_REDISTRIBUTE_ROLES_TO_SOCKET = 'server/DISPATCH_REDISTRIBUTE_ROLES_TO_SOCKET'
export const DISPATCH_RETURN_TO_LOBBY_TO_SOCKET = 'server/DISPATCH_RETURN_TO_LOBBY_TO_SOCKET'
export const DISPATCH_GAME_TO_SOCKET = 'server/DISPATCH_GAME_TO_SOCKET'
export const DISPATCH_GAME_TO_CLIENTS = 'skeleton-card/redux/ducks/session/DISPATCH_GAME_TO_CLIENTS'
export const DISPATCH_START_GAME_TO_SOCKET = 'server/DISPATCH_START_GAME_TO_SOCKET'
export const DISPATCH_ROOM_MESSAGE_TO_CLIENTS = 'skeleton-card/redux/ducks/session/DISPERSE_ROOM_MESSAGE_TO_CLIENTS'
export const DISPATCH_ROOM_MESSAGE_TO_SOCKET = 'server/DISPATCH_ROOM_MESSAGE_TO_SOCKET'
export const LOAD_EXISTING_MESSAGES = 'skeleton-card/redux/ducks/session/LOAD_EXISTING_MESSAGES'

export const REMOVE_CLIENT_FROM_ROOM = 'skeleton-card/redux/ducks/session/REMOVE_CLIENT_FROM_ROOM'
export const SET_GAME = 'skeleton-card/redux/ducks/session/SET_GAME'
export const SET_HOST = 'skeleton-card/redux/ducks/session/SET_HOST'
export const SET_CLIENTS_IN_ROOM = 'skeleton-card/redux/ducks/session/SET_CLIENTS_IN_ROOM'
export const SET_ROOM_FOR_SESSION = 'skeleton-card/redux/ducks/session/SET_ROOM_FOR_SESSION'
export const CLEAR_ROOM_FOR_SESSION = 'skeleton-card/redux/ducks/session/CLEAR_ROOM_FOR_SESSION'
export const SET_GAME_ROLES = 'skeleton-card/redux/ducks/session/SET_GAME_ROLES'
export const CLEAR_CURRENT_GAME = 'skeleton-card/redux/ducks/session/CLEAR_CURRENT_GAME'
export const RETURN_TO_LOBBY = 'skeleton-card/redux/ducks/session/RETURN_TO_LOBBY'
export const REDISTRIBUTE_ROLES = 'skeleton-card/redux/ducks/session/REDISTRIBUTE_ROLES'

export default function reducer(state = { messages: [], clients: [], host: false, selectedGame: null }, action) {
  switch (action.type) {
  case CLEAR_ROOM_FOR_SESSION:
    return { ...state, room: null }
  case SET_ROOM_FOR_SESSION:
    return {...state, room: action.payload }
  case REMOVE_CLIENT_FROM_ROOM:
    console.log('removing client')
    return { ...state, clients: state.clients.filter(client => client.socketId !== action.payload) }
  case SET_CLIENTS_IN_ROOM:
    return { ...state, clients: action.payload }
  case DISPATCH_GAME_TO_CLIENTS:
    return { ...state, selectedGame: action.payload }
  case DISPATCH_ROOM_MESSAGE_TO_CLIENTS:
    console.log(action.payload)
    return { ...state, messages: [...state.messages, action.payload] }
  case LOAD_EXISTING_MESSAGES:
    return { ...state, messages: action.payload }
  case SET_GAME:
    return { ...state, selectedGame: action.payload }
  case SET_HOST:
    return { ...state, host: true }
  case SET_GAME_ROLES:
    return { ...state, roleDistributed: true, clients: action.payload }
  case START_GAME_SUCCESS:
    return { ...state, startGamePending: false }
  case START_GAME_FAIL:
    return { ...state, error: action.error }
  case START_GAME_PENDING:
    return { ...state, startGamePending: true }
  default:
    return state
  }
}

export const setGameRoles = roles => {
  return {
    type: SET_GAME_ROLES,
    payload: roles
  }
}

export const setRoomForSession = roomName => {
  return {
    type: SET_ROOM_FOR_SESSION,
    payload: roomName
  }
}

export const clearRoomForSession = () => {
  return {
    type: CLEAR_ROOM_FOR_SESSION,
  }
}
export const removeClientFromRoom = (clientId) => dispatch => {
  console.log('removing client from room')
  dispatch({
    type: REMOVE_CLIENT_FROM_ROOM,
    payload: clientId
  })
}

export const dispatchGameToClients = (game) => dispatch => {
  dispatch({
    type: DISPATCH_GAME_TO_CLIENTS,
    payload: game
  })
}

export const dispatchRoomMessage = (roomName, message) => {
  return {
    type: DISPATCH_ROOM_MESSAGE_TO_SOCKET,
    payload: {
      roomName: roomName,
      message: message
    }
  }
}

export const setGame = (game, room) => dispatch => {
  dispatch ({
    type: SET_GAME,
    payload: game
  })
  dispatch(dispatchSelectedGameToSocket(game, room))
}

export const dispatchStartGameToSocket = (session) => {
  return {
    type: DISPATCH_START_GAME_TO_SOCKET,
    payload: session
  }
}

export const startGame = (session) => dispatch => {
  console.log(session)
  dispatch(dispatchStartGameToSocket(session))
}

export const dispatchSelectedGameToSocket = ( game, room ) => {
  return {
    type: DISPATCH_GAME_TO_SOCKET,
    payload: {
      game: game,
      room: room
    }
  }
}

