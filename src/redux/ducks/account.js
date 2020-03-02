import accountService from '../../services/account'

export const CREATE_ACCOUNT_PENDING = 'bould/redux/login/CREATE_ACCOUNT_PENDING'
export const CREATE_ACCOUNT_SUCCESS = 'bould/redux/login/CREATE_ACCOUNT_SUCCESS'
export const CREATE_ACCOUNT_FAIL = 'bould/redux/login/CREATE_ACCOUNT_FAIL'

export default function reducer(state = { user: [] }, action) {
  switch (action.type) {
  case CREATE_ACCOUNT_PENDING:
    return { ...state, createAccountPending: true }
  case CREATE_ACCOUNT_SUCCESS:
    return { ...state, createAccountPending: false, user: null }
  case CREATE_ACCOUNT_FAIL:
    return { ...state, error: action.error }
  default:
    return state
  }
}

export const createAccountSuccess = () => {
  return {
    type: CREATE_ACCOUNT_SUCCESS
  }
}
export const createAccountPending = () => {
  return {
    type: CREATE_ACCOUNT_PENDING
  }
}

export const createAccountFail = (error) => {
  return {
    type: CREATE_ACCOUNT_FAIL,
    error: error
  }
}

export const createAccount = (username, name, email, password) => async dispatch => {
  dispatch(createAccountPending())
  await accountService.createAccount({
    username, name, email, password
  })
    .then(user => {
      dispatch(createAccountSuccess(user))
    })
    .catch(error => dispatch(createAccountFail(error)))
}
