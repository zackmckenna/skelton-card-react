import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import loginService from '../services/login'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = event => {
    setUsername(event.target.value)
    console.log(username)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
    console.log(password)
  }

  const handleLoginClick = event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    loginService.login(username, password)
  }

  return (
  <MDBContainer>
    <MDBRow>
      <MDBCol md="6">
        <form>
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

export default LoginForm;
