import loginService from '../../services/login'

export const LOGIN_AUTH_SET= 'bould/redux/login/LOGIN_AUTH_SET';
export const LOGIN_AUTH_SUCCESS = 'bould/redux/login/LOGIN_AUTH_SUCCESS';
export const LOGIN_AUTH_FAIL = 'bould/redux/login/LOGIN_AUTH_FAIL';
export const LOGIN_AUTH_PENDING = 'bould/redux/login/LOGIN_AUTH_PENDING';

export const LOGOUT_PENDING = 'bould/redux/login/LOGOUT_PENDING';
export const LOGOUT_SUCCESS = 'bould/redux/login/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'bould/redux/login/LOGOUT_FAIL';

export default function reducer(state = { user: [] }, action) {
  switch (action.type) {
    case LOGOUT_PENDING:
      return {...state, logoutPending: true }
    case LOGOUT_SUCCESS:
      return {...state, logoutPending: false, user: null }
    case LOGOUT_FAIL:
      return {...state, error: action.error }
    case LOGIN_AUTH_PENDING:
      return { ...state, loading: true };
    case LOGIN_AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while authenticating user'
      };
    default:
      return state;
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}
export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  }
}

export const logoutFail = (error) => {
  return {
    type: LOGOUT_FAIL,
    error: error
  }
}

export const loginAuthPending = () => {
  return {
    type: LOGIN_AUTH_PENDING
  }
}

export const loginAuthSuccess = user => {
  console.log('auth success user:', user)
  return {
    type: LOGIN_AUTH_SUCCESS,
    payload: user
  }
}

export const loginAuthFail = error => {
  return {
    type: LOGIN_AUTH_FAIL,
    error: error
  }
}


export const loginUser = (username, password) => async dispatch => {
    dispatch(loginAuthPending())
    console.log('login user:', username, password)
    await loginService.login({
      username, password
    })
    .then(user => {
      dispatch(loginAuthSuccess(user))
    })
    .catch(error => dispatch(loginAuthFail(error)))
}
