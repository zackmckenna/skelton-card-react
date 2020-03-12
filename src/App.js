import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { MDBBtn } from 'mdbreact'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from  'react-router-dom'

// component imports
import LoginForm from './components/LoginForm'
import NavbarTop from './components/TopNavbar'
import Home from './components/Home'
import RoomLobby from './components/RoomLobby'

// api/service imports
import userService from './services/user'

// redux action imports
import { initUsers } from './redux/ducks/user'
import { initializeGames } from './redux/ducks/games'

import { games } from './shared/games'

const App = (props) => {
  const [users, setUsers] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // props.initUsers()
    props.initializeGames(games)
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
            <RoomLobby />
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
  initializeGames
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
