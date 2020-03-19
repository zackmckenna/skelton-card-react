import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import SpinLoader from '../utility/SpinLoader'
import ReturnToLobbyButton from '../buttons/ReturnToLobbyButton'
import { Redirect } from 'react-router-dom'
import { Button, Row, Col, Form, Container } from 'react-bootstrap'
import { setRoomName } from '../../redux/ducks/socket'
import { setGame, dispatchRoomMessage, startGame } from '../../redux/ducks/session'
import uuid from 'uuid'

const SeawitchedGameScreen = (props) => {
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
  if (props.session.returnToLobby) {
    return (
      <Redirect to='/lobby'/>
    )
  } else if (props.login.user && props.login.user.token) {
    if(props.room) {
      return (
        <Container>
          <Row>
            <Col>
              <ReturnToLobbyButton />
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>Seawitched Role: {getClientRole(props.login.user.id, props.session.clients) ? getClientRole(props.login.user.id, props.session.clients).role : null }</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(SeawitchedGameScreen)
