import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux'
import { createAccount } from  '../redux/ducks/account'

const CreateAccountForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleCreateAccountClick = event => {
    event.preventDefault()
    try {
      props.createAccount(username, name, email, password)
      setUsername('')
      setPassword('')
      setName('')
      setEmail('')
      props.toggleCreateAccount()
    } catch {
      console.log('error')
    }
  }

  return (
  <MDBContainer>
    <MDBRow>
      <MDBCol md="4">
        <form>
          <p className="h5 text-center mb-4">Sign in</p>
          <div className="grey-text">
            <MDBInput value={username} onChange={event => handleUsernameChange(event)}label="username" icon="envelope" group type="email" validate error="wrong"
              success="right" />
            <MDBInput value={name} onChange={event => handleNameChange(event)} label="name" icon="lock" group type="email" validate />
            <MDBInput value={email} onChange={event => handleEmailChange(event)} label="email" icon="lock" group type="email" validate />
            <MDBInput value={password} onChange={event => handlePasswordChange(event)} label="Type your password" icon="lock" group type="password" validate />
          </div>
          <div className="text-center">
            <MDBBtn onClick={event => handleCreateAccountClick(event)}>Create Account</MDBBtn>
            <MDBBtn onClick={() => props.toggleCreateAccount()}>cancel</MDBBtn>
          </div>
        </form>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  );
};

const mapDispatchToProps = {
  createAccount,
}

const mapStateToProps = state => {
  return {
    users: state.users,
    login: state.login
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm)
