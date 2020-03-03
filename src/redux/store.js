import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import userReducer from './ducks/user'
import loginReducer from './ducks/login'
import accountReducer from './ducks/account'
import socketReducer from './ducks/socket'

let socket = io('http://localhost:3003')
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')


const reducer = combineReducers({
  users: userReducer,
  login: loginReducer,
  account: accountReducer,
  socket: socketReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk, socketIoMiddleware)
  )
)

export default store
