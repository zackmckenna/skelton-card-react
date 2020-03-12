import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginForm from './LoginForm'
import SpinLoader from './utility/SpinLoader'
import CreateAccountForm from './CreateAccountForm'
import { MDBBtn, MDBInput, MDBBtnGroup } from 'mdbreact'
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
    if(props.room) {
      return (
        <>
          <h1>{props.session.selectedGame ? props.session.selectedGame.gameName : 'Choose a game'}</h1>
          <h2>Current Room: {props.room}</h2>
          {props.session.host ? <p>You are the host</p> : null }
          <MDBBtnGroup>
            {props.games.games.map(game => {
              return (
                <MDBBtn
                  onClick={(event) => handleChangeGameClick(event)}
                  value={game.gameName}
                  key={game.gameName}>{game.gameName}</MDBBtn>
              )
            })}
          </MDBBtnGroup>
          <MDBBtn onClick={() => handleStartGameClick()}>Start Game</MDBBtn>
          <h2>Users</h2>
          {/* {props.session.selectedGame ? <h4>Must have at least {props.session.selectedGame.minPlayers} to play.</h4> : ''} */}
          {props.session.clients ? props.session.clients.map((client, index) => <p key={index}>{client.username}</p>) : null}
          {getClientRole(props.login.user.id, props.session.clients) ? getClientRole(props.login.user.id, props.session.clients).role : null }
          <h2>send users message</h2>
          <MDBBtn onClick={() => handleSendMessage()}>Send Message To Room</MDBBtn><MDBInput value={message} onChange={event => handleMessageChange(event)} label="message" icon="lock" group type="email" validate />
          <h3>messages</h3>
          {props.session.messages ? props.session.messages.map((message, index) => message ? <p key={index}>{message.user}: {message.message}</p> : null) : null }
        </>
      )
    } else if (!props.room){
      return (
        <>
          <h1>Home page. User: {props.login.user.username} </h1>
          <MDBBtn onClick={() => handleCreateRoom()}>Create/Join Room</MDBBtn><MDBInput value={lobbyName} onChange={event => handleRoomNameChange(event)} label="create/join a room" icon="lock" group type="email" validate />
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
        <MDBBtn style={{ width: '13rem' }} onClick={() => toggleCreateAccount(!createAccount)}>create an account</MDBBtn>
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
