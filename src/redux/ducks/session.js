
export const START_GAME = 'skeleton-card/redux/ducks/session/START_GAME'
export const START_GAME_PENDING = 'skeleton-card/redux/ducks/session/START_GAME_PENDING'
export const START_GAME_SUCCESS = 'skeleton-card/redux/ducks/session/START_GAME_SUCCESS'
export const START_GAME_FAIL = 'skeleton-card/redux/ducks/session/START_GAME_FAIL'

export const DISPATCH_GAME_TO_SOCKET = 'server/DISPATCH_GAME_TO_SOCKET'

export const SET_GAME = 'skeleton-card/redux/ducks/session/SET_GAME'
export const SET_HOST = 'skeleton-card/redux/ducks/session/SET_HOST'
export const SET_USERS = 'skeleton-card/redux/ducks/session/SET_HOST'

export default function reducer(state = { users: [], host: false }, action) {
  switch (action.type) {
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

export const setGame = (game) => dispatch => {
  dispatch ({
    type: SET_GAME,
    payload: game
  })
  dispatch(dispatchSelectedGameToSocket(game))
}

export const dispatchSelectedGameToSocket = game => {
  return {
    type: DISPATCH_GAME_TO_SOCKET,
    payload: game
  }
}

