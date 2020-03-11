import React from 'react'
import { connect } from 'react-redux'
import { MDBBtn } from 'mdbreact'
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
    <MDBBtn onClick={() => handleLeaveRoom()}>
      Leave Room
    </MDBBtn>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRoomButton)


