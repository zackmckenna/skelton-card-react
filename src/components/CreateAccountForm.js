import React, { useState } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

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
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId='formBasicUsername'>
              <Form.Label>username</Form.Label>
              <Form.Control value={username} onChange={event => handleUsernameChange(event)} type='username' placeholder='enter desired username' />
            </Form.Group>


            <Form.Group controlId='formBasicUsername'>
              <Form.Label>password</Form.Label>
              <Form.Control value={password} onChange={event => handlePasswordChange(event)} type='password' placeholder='enter password' />
            </Form.Group>

            {/* <Form.Group controlId='formBasicUsername'>
              <Form.Label>password</Form.Label>
              <Form.Control value={password} onChange={event => handlePasswordChange(event)} type='password' placeholder='enter password' />
            </Form.Group> */}

            <Form.Group controlId='formBasicUsername'>
              <Form.Label>email</Form.Label>
              <Form.Control value={email} onChange={event => handleEmailChange(event)} type='email' placeholder='email' />
            </Form.Group>

            <Button onClick={event => handleCreateAccountClick(event)} variant="primary" type="submit">
              Create Account
            </Button>
            <Button onClick={() => props.toggleCreateAccount()}>
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
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
