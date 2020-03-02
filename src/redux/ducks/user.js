import userService from '../../services/user'

export const INIT_USERS_SUCCESS = 'bould/redux/login/INIT_USERS_SUCCESS'
export const INIT_USERS_FAIL = 'bould/redux/login/INIT_USERS_FAIL'
export const INIT_USERS_PENDING = 'bould/redux/login/INIT_USERS_PENDING'

export default function reducer(state = { users: [] }, action) {
  switch (action.type) {
  case INIT_USERS_PENDING:
    return { ...state, initUsersPending: true }
  case INIT_USERS_SUCCESS:
    return { ...state, initUsersPending: false, users: action.payload }
  case INIT_USERS_FAIL:
    return { ...state, error: action.error }
  default:
    return state
  }
}

export const initUsersPending = () => {
  return {
    type: INIT_USERS_PENDING,
  }
}

export const initUsersFail = error => {
  return {
    type: INIT_USERS_FAIL,
    error: error
  }
}

export const initUsersSuccess = users => {
  return {
    type: INIT_USERS_SUCCESS,
    payload: users
  }
}

export const initUsers = () => async dispatch => {
  dispatch(initUsersPending())
  try {
    await userService.getAll()
      .then(users => dispatch(initUsersSuccess(users)))
  } catch(error) {
    dispatch(initUsersFail(error))
  }
}
