import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import SpinLoader from '../utility/SpinLoader'
import { MDBBtn, MDBInput, MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownItem, MDBDropdownMenu } from 'mdbreact'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { setRoomName } from '../../redux/ducks/socket'
import { setGame, dispatchRoomMessage, startGame } from '../../redux/ducks/session'
import uuid from 'uuid'

const SpyfallGameScreen = (props) => {
  const [message, setMessage] = useState('')
  const [selectedGame, setSelectedGame] = useState('Choose a game')

  useEffect(() => {
    console.log('loading lobby')
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

  const getClientRole = (userId, clients) => clients.filter(client => client.userId === userId )[0]

  if (props.login.user && props.login.user.token) {
    if(props.room) {
      return (
        <>
          <Row>
            <Col>
              <h1>Spyfall Role: {getClientRole(props.login.user.id, props.session.clients) ? getClientRole(props.login.user.id, props.session.clients).isSpy ? 'spy' : `not-spy: ${getClientRole(props.login.user.id, props.session.clients).location}` : null }</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Current Users</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {props.session.clients ? props.session.clients.map((client, index) => <p key={index}>{client.username}</p>) : null}
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
      <h1>No game data</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpyfallGameScreen)
