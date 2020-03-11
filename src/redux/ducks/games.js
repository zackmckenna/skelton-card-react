
export const SET_GAME = 'skeleton-card/redux/ducks/games/SET_GAME'
export const INIT_GAMES_PENDING = 'skeleton-card/redux/ducks/games/INIT_GAMES_PENDING'
export const INIT_GAMES_SUCCESS = 'skeleton-card/redux/ducks/games/INIT_GAMES_SUCCESS'
export const INIT_GAMES_FAIL = 'skeleton-card/redux/ducks/games/INIT_GAMES_FAIL'

export default function reducer(state = { user: [] }, action) {
  switch (action.type) {
  case INIT_GAMES_SUCCESS:
    return { ...state, gamesLoading: false, games: action.payload }
  case INIT_GAMES_PENDING:
    return { ...state, gamesLoading: true }
  case INIT_GAMES_FAIL:
    return { ...state, gamesLoading: false, error: action.error }
  case SET_GAME:
    return { ...state, selectedGame: state.games.filter(game => game.gameName === action.payload)[0] }
  default:
    return state
  }
}

export const initGamesPending = () => {
  return {
    type: INIT_GAMES_PENDING,
  }
}

export const initGamesFail = error => {
  return {
    type: INIT_GAMES_FAIL,
    error: error
  }
}

export const initGamesSuccess = users => {
  return {
    type: INIT_GAMES_SUCCESS,
    payload: users
  }
}

export const setGame = (game) => dispatch => {
  dispatch ({
    type: SET_GAME,
    payload: game
  })
}

export const initializeGames = (games) => async dispatch => {
  dispatch(initGamesPending())
  try {
    await dispatch(initGamesSuccess(games))
  } catch (error){
    dispatch(initGamesFail(error))
  }
}
