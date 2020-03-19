import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import SpinLoader from '../utility/SpinLoader'
import { Redirect } from 'react-router-dom'
import { MDBBtn, MDBInput, MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownItem, MDBDropdownMenu } from 'mdbreact'
import { Button, Row, Col, Form, ListGroup, Container } from 'react-bootstrap'
import { setRoomName } from '../../redux/ducks/socket'
import { setGame, dispatchRoomMessage, startGame, returnToLobby } from '../../redux/ducks/session'
import uuid from 'uuid'

const SpyfallGameScreen = (props) => {
  const [message, setMessage] = useState('')
  const [selectedGame, setSelectedGame] = useState('Choose a game')
  const [isSpy, setIsSpy] = useState(false)
  const [activeLocation, setActiveLocation] = useState('')
  const [viewLocation, toggleViewLocation] = useState(false)

  useEffect(() => {
    if (props.login.user && props.session.selectedGame && props.session.selectedGame.gameName === 'spyfall'){
      console.log('loading lobby')
      setIsSpy(getClientRole(props.login.user.id, props.session.clients).isSpy)
      setActiveLocation(getClientRole(props.login.user.id, props.session.clients).location)
    }
  }, [])

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

  const handleReturnToLobby = (roomName) => {
    console.log(roomName)
    props.returnToLobby(props.session.room)
  }

  const getClientRole = (userId, clients) => clients.filter(client => client.userId === userId )[0]
  if (props.session.returnToLobby) {
    return <Redirect to='/lobby' />
  } else if (props.login.user && props.login.user.token) {
    if(props.room) {
      if(isSpy) {
        return (
          <Container>
          <Row>
            <Col>
              <Button onClick={() => handleReturnToLobby()}>
                Return To Lobby
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>You are the SPY</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              You must try to figure out the current location
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                {props.session.selectedGame.locations.map(location => {
                  return (
                    <ListGroup.Item>{location}</ListGroup.Item>
                  )
                })}
              </ListGroup>
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
        )
      } else if (!isSpy)
      return (
        <Container>
          <Row>
            <Col>
              <Button onClick={() => handleReturnToLobby()}>
                Return To Lobby
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>You are not the Spy</h1>
            </Col>
          </Row>
          <Row>
            <Col >
              <Button onClick={() => toggleViewLocation(!viewLocation)}>
                {viewLocation ? activeLocation : 'view location'}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup as='ul'>
                {props.session.selectedGame.locations.map(location => <ListGroup.Item as='li'>{location}</ListGroup.Item>
                )}
              </ListGroup>
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
      <Redirect to='/' />
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
  returnToLobby
}

export default connect(mapStateToProps, mapDispatchToProps)(SpyfallGameScreen)
