import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
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
    <Container>
      <h1>Log In</h1>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={event => handleUsernameChange(event)} value={username} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={event => handlePasswordChange(event)}  value={password} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button onClick={event => handleLoginClick(event)} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
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
