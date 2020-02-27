import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// import userReducer from './ducks/userReducer'
import loginReducer from './ducks/login'

const reducer = combineReducers({
  // user: userReducer,
  login: loginReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
