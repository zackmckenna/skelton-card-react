import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import loginService from '../services/login'
import { connect } from 'react-redux'
import { loginUser } from  '../redux/ducks/login'
import { connectClient, setSocketUser } from '../redux/ducks/socket'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleLoginClick = event => {
    event.preventDefault()
    try {
      props.loginUser(username, password)
      setUsername('')
      setPassword('')
    } catch {
      console.log('error')
    }
  }

  return (
  <MDBContainer style={{ marginTop: '5rem'}}>
    <MDBRow style={{ textAlign: 'center', justifyContent: 'center' }}>
      <MDBCol md="6">
        <form >
          <p className="h5 text-center mb-4">Sign in</p>
          <div className="grey-text">
            <MDBInput value={username} onChange={event => handleUsernameChange(event)}label="Type your email" icon="envelope" group type="email" validate error="wrong"
              success="right" />
            <MDBInput value={password} onChange={event => handlePasswordChange(event)} label="Type your password" icon="lock" group type="password" validate />
          </div>
          <div className="text-center">
            <MDBBtn onClick={event => handleLoginClick(event)}>Login</MDBBtn>
          </div>
        </form>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  );
};

const mapDispatchToProps = {
  loginUser,
  connectClient,
  setSocketUser
}

const mapStateToProps = state => {
  return {
    users: state.users,
    login: state.login
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
