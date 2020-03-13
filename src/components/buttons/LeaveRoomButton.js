import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { leaveRoom } from '../../redux/ducks/socket'

const mapDispatchToProps = {
  leaveRoom
}

const mapStateToProps = state => {
  return {
    roomName: state.socket.room
  }
}


const LeaveRoomButton = (props) => {

  const handleLeaveRoom = () => {
    props.leaveRoom(props.roomName)
  }

  return (
    <Button onClick={() => handleLeaveRoom()}>
      Leave Room
    </Button>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRoomButton)


