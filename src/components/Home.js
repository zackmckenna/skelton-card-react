import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginForm from './LoginForm'
import SpinLoader from './utility/SpinLoader'
import CreateAccountForm from './CreateAccountForm'
import { MDBBtn, MDBInput, MDBRow, MDBCol } from 'mdbreact'
import { Button, Row, Col, Form, Jumbotron } from 'react-bootstrap'
import { setRoomName } from '../redux/ducks/socket'
import { setGame, dispatchRoomMessage, startGame } from '../redux/ducks/session'

const Home = (props) => {
  let history = useHistory()
  const [lobbyName, setLobbyName] = useState('')
  const [createAccount, toggleCreateAccount] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedGame, setSelectedGame] = useState('Choose a game')

  const handleRoomNameChange = event => {
    setLobbyName(event.target.value)
  }

  const handleMessageChange = event => {
    setMessage(event.target.value)
  }

  const handleSendMessage = () => {
    props.dispatchRoomMessage(props.room, message)
    setMessage('')
  }

  const handleChangeGameClick = (event) => {
    setSelectedGame(event.target.value)
    const gameToSet = props.games.games.filter(game => game.gameName === event.target.value)[0]
    props.setGame(gameToSet, props.socket.room)
  }

  const getClientRole = (userId, clients) => clients.filter(client => client.userId === userId )[0]

  const handleStartGameClick = () => {
    if(selectedGame !== 'Choose a game'){
      props.startGame(props.session)
    }
    console.log('no game selected')
  }

  const handleCreateRoom = () => {
    props.setRoomName(lobbyName)
    setLobbyName('')
    history.push('/lobby')
  }

  if (props.login.user && props.login.user.token) {
    if(props.room){
      return (
        <h1>Room: {props.room}</h1>
      )
    }
    if (!props.room){
      return (
        <>
        <Jumbotron>
          <Row>
            <Col>
            <h1>Welcome, {props.login.user.username}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Room Name</Form.Label>
                  <Form.Text>
                    Create a room by using a new name, or join an existing room by typing in a matching name
                  </Form.Text>
                  <Form.Control value={lobbyName} onChange={event => handleRoomNameChange(event)} type="email" placeholder="Enter email" />
                </Form.Group>
                <Button onClick={() => handleCreateRoom()} variant="primary" type="submit">
                  Create/Join Room
                </Button>
              </Form>
            </Col>
          </Row>
        </Jumbotron>
        </>
      )
    }
  } else if (props.login.loading) {
    return (
      <SpinLoader />
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
        <Button onClick={() => toggleCreateAccount(!createAccount)}variant="link">create an account</Button>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
    users: state.users,
    room: state.socket.room,
    socket: state.socket,
    usersInRoom: state.socket.currentClientsInRoom,
    games: state.games,
    session: state.session
  }
}

const mapDispatchToProps = {
  setRoomName,
  dispatchRoomMessage,
  setGame,
  startGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
