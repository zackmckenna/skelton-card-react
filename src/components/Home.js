import React, { useState } from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import CreateAccountForm from './CreateAccountForm'
import { MDBBtn } from 'mdbreact'
const Home = (props) => {
  const [createAccount, toggleCreateAccount] = useState(false)

  if (props.login.user) {
    return (
      <>
        <h1>Home page. User: {props.login.user.username} </h1>
        <h2>Create Lobby</h2>
        <h3>Join Lobby</h3>
      </>
    )
  } else if(createAccount) {
    return (
      <CreateAccountForm
        toggleCreateAccount={() => toggleCreateAccount(!createAccount)}
        createAccount={createAccount}/>
    )
  } else {
    return (
      <>
        <LoginForm />
        <MDBBtn onClick={() => toggleCreateAccount(!createAccount)}>create an account</MDBBtn>
      </>

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
