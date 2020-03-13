import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import SpinLoader from './utility/SpinLoader'
import { MDBBtn, MDBInput, MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownItem, MDBDropdownMenu } from 'mdbreact'
import { setRoomName } from '../redux/ducks/socket'
import { setGame, dispatchRoomMessage, startGame } from '../redux/ducks/session'

const GameScreen = (props) => {
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
          <h1>Role:{getClientRole(props.login.user.id, props.session.clients) ? getClientRole(props.login.user.id, props.session.clients).role : null }</h1>
          <h2>Users</h2>
          {/* {props.session.selectedGame ? <h4>Must have at least {props.session.selectedGame.minPlayers} to play.</h4> : ''} */}
          {props.session.clients ? props.session.clients.map((client, index) => <p key={index}>{client.username}</p>) : null}
          <h2>send users message</h2>
          <MDBBtn onClick={() => handleSendMessage()}>Send Message To Room</MDBBtn><MDBInput value={message} onChange={event => handleMessageChange(event)} label="message" icon="lock" group type="email" validate />
          <h3>messages</h3>
          {props.session.messages ? props.session.messages.map((message, index) => message ? <p key={index}>{message.user}: {message.message}</p> : null) : null }
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

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
