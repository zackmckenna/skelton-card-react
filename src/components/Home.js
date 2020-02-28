import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'


const Home = (props) => {
  if (props.login.user) {
    return (
      <h1>Home page. User: {props.login.user.username} </h1>
    )
  } else {
    return (
      <LoginForm />
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    users: state.users
  }
}

export default connect(mapStateToProps)(Home)
