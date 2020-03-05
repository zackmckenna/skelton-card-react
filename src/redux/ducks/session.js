
export const START_GAME = 'skeleton-card/redux/ducks/session/START_GAME'
export const START_GAME_PENDING = 'skeleton-card/redux/ducks/session/START_GAME_PENDING'
export const START_GAME_SUCCESS = 'skeleton-card/redux/ducks/session/START_GAME_SUCCESS'
export const START_GAME_FAIL = 'skeleton-card/redux/ducks/session/START_GAME_FAIL'

export const DISPATCH_GAME_TO_SOCKET = 'server/DISPATCH_GAME_TO_SOCKET'
export const DISPATCH_GAME_TO_CLIENTS = 'skeleton-card/redux/ducks/session/DISPATCH_GAME_TO_CLIENTS'

export const DISPATCH_ROOM_MESSAGE_TO_CLIENTS = 'skeleton-card/redux/ducks/session/DISPERSE_ROOM_MESSAGE_TO_CLIENTS'
export const DISPATCH_ROOM_MESSAGE_TO_SOCKET = 'server/DISPATCH_ROOM_MESSAGE_TO_SOCKET'
export const LOAD_EXISTING_MESSAGES = 'skeleton-card/redux/ducks/session/LOAD_EXISTING_MESSAGES'

export const SET_GAME = 'skeleton-card/redux/ducks/session/SET_GAME'
export const SET_HOST = 'skeleton-card/redux/ducks/session/SET_HOST'
export const SET_USERS = 'skeleton-card/redux/ducks/session/SET_HOST'

export default function reducer(state = { messages: [], users: [], host: false, selectedGame: null }, action) {
  switch (action.type) {
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

export const dispatchSelectedGameToSocket = ( game, room ) => {
  return {
    type: DISPATCH_GAME_TO_SOCKET,
    payload: {
      game: game,
      room: room
    }
  }
}

