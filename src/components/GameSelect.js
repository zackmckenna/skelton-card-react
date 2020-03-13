import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap'
import { setRoomName } from '../redux/ducks/socket'
import { setGame, dispatchRoomMessage, startGame } from '../redux/ducks/session'
import uuid from 'uuid'

const GameSelect = (props) => {
  const [selectedGame, setSelectedGame] = useState('Choose a game')

  useEffect(() => {
    console.log('loading lobby')
  }, [])

  const handleChangeGameClick = (event) => {
    console.log(event.target.value)
    event.preventDefault()
    setSelectedGame(event.target.value)
    const gameToSet = props.games.games.filter(game => game.gameName === event.target.value)[0]
    props.setGame(gameToSet, props.socket.room)
  }

  const handleStartGameClick = () => {
    if(selectedGame !== 'Choose a game'){
      props.startGame(props.session)
    }
    console.log('no game selected')
  }

  const renderButton = () => {
    if (props.session.selectedGame) {
      if (props.session.clients.length < props.session.selectedGame.minPlayers) {
        return (
          <Alert key={uuid()}>
            Need at least {props.session.selectedGame.minPlayers} to play
          </Alert>
        )
      } else if (props.session.clients.length >= props.session.selectedGame.maxPlayers) {
        return (
          <>
            <h2>Max Players Reached</h2>
            <Button onClick={() => handleStartGameClick()}>Start Game</Button>
          </>
        )
      } else {
        return (
          <Button onClick={() => handleStartGameClick()}>Start Game</Button>
        )
      }
    }
  }

  if (props.login.user && props.login.user.token) {
    if(props.session.roleDistributed) {
      console.log('roles distributed')
      return <Redirect to='/game'/>
    }

    if(props.room) {
      return (
        <>
          <Row>
            <Col>
              <Form onChange={event => handleChangeGameClick(event)}>
                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                  <Form.Label>Select a Game</Form.Label>
                  <Form.Control as="select" size="sm" custom>
                  {props.games.games.map(game => {
                    return (
                      <option
                        // onClick={(event) => handleChangeGameClick(event)}
                        value={game.gameName}
                        key={game.gameName}>{game.gameName}</option>
                    )
                  })}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              {renderButton()}
            </Col>
          </Row>
        </>
      )
      } else {
      return (
        <h1>error creating game select</h1>
      )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(GameSelect)
