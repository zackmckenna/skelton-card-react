import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import App from './App'
import store from './redux/store'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'

store.subscribe(() => {
  console.log('new client state', store.getState())
})

store.dispatch({ type: 'server/hello', data: 'hello' })


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
