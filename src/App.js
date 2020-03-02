import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import LoginForm from './components/LoginForm'
import NavbarTop from './components/TopNavbar'
import userService from './services/user'
import { MDBBtn } from 'mdbreact'
import { connect } from 'react-redux'
import { initUsers } from './redux/ducks/user'
import Home from './components/Home'
import Lobby from './components/Lobby'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from  'react-router-dom'

const App = (props) => {
  const [users, setUsers] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initUsers()
    // userService
    //   .getAll()
    //   .then(users => {
    //     setUsers(users)
    //   })
  //  console.log(userService.getAll())
  //  setUsers(userService.getAll())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  return (
    <div className="App">
      <Router>
        <NavbarTop />
        <Switch>
          <Route path ='/'>
            <Home />
          </Route>
          <Route path ='/lobby'>
            <Lobby />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users,
    login: state.login
  }
}

const mapDispatchToProps = {
  initUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
