import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import userReducer from './ducks/user'
import loginReducer from './ducks/login'
import accountReducer from './ducks/account'
import socketReducer from './ducks/socket'

const reducer = combineReducers({
  users: userReducer,
  login: loginReducer,
  account: accountReducer,
  socket: socketReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
