import React, { useState } from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import CreateAccountForm from './CreateAccountForm'
import { MDBBtn, MDBInput } from 'mdbreact'
import { setRoomName, dispatchRoomMessage } from '../redux/ducks/socket'

const Home = (props) => {
  const [lobbyName, setLobbyName] = useState('')
  const [createAccount, toggleCreateAccount] = useState(false)
  const [message, setMessage] = useState('')

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

  const handleCreateRoom = () => {
    props.setRoomName(lobbyName)
  }
  if (props.login.user && props.login.user.token) {
    if(props.room) {
      return (
        <>
          <h2>Current Room: {props.room}</h2>
          <h2>Users</h2>
          {props.usersInRoom ? props.usersInRoom.map((client, index) => <p key={index}>{client.username}</p>) : null}
          <h2>send users message</h2>
          <MDBBtn onClick={() => handleSendMessage()}>Send Message To Room</MDBBtn><MDBInput value={message} onChange={event => handleMessageChange(event)} label="message" icon="lock" group type="email" validate />
          <h3>messages</h3>
          {props.socket.messages.map((message, index) => <li key={index}>{message}</li>)}
        </>
      )
    } else if (!props.room){
      return (
        <>
          <h1>Home page. User: {props.login.user.username} </h1>
          <MDBBtn onClick={() => handleCreateRoom()}>Create Room</MDBBtn><MDBInput value={lobbyName} onChange={event => handleRoomNameChange(event)} label="create a room" icon="lock" group type="email" validate />
          <h3>Join Lobby</h3>
          <h2>send users message</h2>
          <MDBBtn onClick={() => handleSendMessage()}>Send Message To Room</MDBBtn><MDBInput value={message} onChange={event => handleMessageChange(event)} label="type a message" icon="lock" group type="email" validate />
        </>
      )
    }
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
        <MDBBtn onClick={() => toggleCreateAccount(!createAccount)}>create an account</MDBBtn>
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
    usersInRoom: state.socket.currentClientsInRoom
  }
}

const mapDispatchToProps = {
  setRoomName,
  dispatchRoomMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
