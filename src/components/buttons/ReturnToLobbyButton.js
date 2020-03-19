import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { returnToLobby } from '../../redux/ducks/session'

const ReturnToLobbyButton = (props) => {

  const handleReturnToLobby = (roomName) => {
    props.returnToLobby(props.session.room)
    return (
      <Redirect to='/lobby' />
    )
  }

  return (
  <Button onClick={() => handleReturnToLobby()}>
    Return To Lobby
  </Button>
  )
}

const mapStateToProps = state => {
  return {
    session: state.session
  }
}

const mapDispatchToProps = {
  returnToLobby
}

export default connect(mapStateToProps, mapDispatchToProps)(ReturnToLobbyButton)
