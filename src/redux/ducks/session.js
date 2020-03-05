
export const START_GAME = 'skeleton-card/redux/ducks/session/START_GAME'
export const START_GAME_PENDING = 'skeleton-card/redux/ducks/session/START_GAME_PENDING'
export const START_GAME_SUCCESS = 'skeleton-card/redux/ducks/session/START_GAME_SUCCESS'
export const START_GAME_FAIL = 'skeleton-card/redux/ducks/session/START_GAME_FAIL'
export const DISPATCH_GAME_TO_SOCKET = 'skeleton-card/redux/ducks/session/DISPATCH_GAME_TO_SOCKET'

export default function reducer(state = { users: [] }, action) {
  switch (action.type) {
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
