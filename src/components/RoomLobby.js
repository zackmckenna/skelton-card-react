import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import GameSelect from './GameSelect'
import SpinLoader from './utility/SpinLoader'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { setRoomName } from '../redux/ducks/socket'
import { setGame, dispatchRoomMessage, startGame, returnedToLobby } from '../redux/ducks/session'
import uuid from 'uuid'

const RoomLobby = (props) => {
  let history = useHistory()
  const [message, setMessage] = useState('')
  const [selectedGame, setSelectedGame] = useState('Choose a game')

  useEffect(() => {
    console.log('loading lobby')
    props.returnedToLobby()
  }, [])

  const handleMessageChange = event => {
    setMessage(event.target.value)
  }

  const handleSendMessage = () => {
    props.dispatchRoomMessage(props.room, message)
    setMessage('')
  }

  const handleChangeGameClick = (event) => {
    console.log(event.target.value)
    event.preventDefault()
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

  if (props.login.user && props.login.user.token) {
    if(props.session.roleDistributed) {
      console.log('roles distributed')
      console.log('current game:', props.session.selectedGame.gameName)
      switch(props.session.selectedGame.gameName){
        case 'seawitched':
          return <Redirect to='/game/seawitched'/>
        case 'spyfall':
          return <Redirect to='/game/spyfall'/>
        case 'traitor':
          return <Redirect to='/game/traitor'/>
        default:
          return <Redirect to='/game'/>
      }
    }

    if(props.room) {
      return (
        <>
          <Container>
            <Row>
              <Col>
                <h1>{props.session.selectedGame ? props.session.selectedGame.gameName : 'Choose a game'}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>Current Room: {props.room}</h2>
                {props.session.host ? <p>You are the host</p> : null }
              </Col>
            </Row>
            <GameSelect />
            <Row>
              <Col>
                <h2>Users</h2>
                {/* {props.session.selectedGame ? <h4>Must have at least {props.session.selectedGame.minPlayers} to play.</h4> : ''} */}
                {props.session.clients ? props.session.clients.map((client, index) => <p key={index}>{client.username}</p>) : null}
                {getClientRole(props.login.user.id, props.session.clients) ? getClientRole(props.login.user.id, props.session.clients).role : null }
              </Col>
            </Row>
            <Row>
              <Col>
                <Form onChange={event => handleMessageChange(event)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>type a message</Form.Label>
                    <Form.Control value={message} type="text" placeholder="type a message" />
                    <Form.Text className="text-muted">
                      send a message to the room
                    </Form.Text>
                  </Form.Group>
                </Form>
                <Button onClick={() => handleSendMessage()}>
                  Send Message To Room
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>messages</h3>
                <ul className='list-group' style={{ marginBottom: '5px', textAlign: 'left' }}>
                {props.session.messages.length > 0 ? (
                  props.session.messages.map(msg => (
                    <Row>
                      <Col>
                        <li className='list-group-item' key={uuid()}>
                          <p style={{ marginBottom: '0' }}><strong>{msg.user}: </strong>{msg.message}</p>
                        </li>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <div className='text-center mt-5 pt-5'>
                    <p className='lead text-center'>Fetching Messages</p>
                  </div>
                )}
              </ul>
              </Col>
            </Row>
          </Container>
        </>
      )
    } else if (!props.room){
      return (
        <>
          <h1>ERROR CREATING ROOM</h1>
        </>
      )
    }
  } else if (props.login.loading) {
    return (
      <SpinLoader />
    )
  } else {
    return (
      <Redirect to='/'/>
      // <h1>no data</h1>
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
  startGame,
  returnedToLobby
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomLobby)
