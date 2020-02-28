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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
        <LoginForm user={user} setUser={setUser} />

        <Switch>
          <Route path ='/' component={Home}/>
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
