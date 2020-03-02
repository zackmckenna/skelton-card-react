import React from 'react'
import { connect } from 'react-redux'
import { MDBBtn } from 'mdbreact'
import { logoutUser } from '../../redux/ducks/login'

const mapDispatchToProps = {
  logoutUser
}

const LogoutButton = (props) => {

  const handleLogout = () => {
    props.logoutUser()
  }

  return (
    <MDBBtn onClick={() => handleLogout()}>
      Logout
    </MDBBtn>
  )
}

export default connect(null, mapDispatchToProps)(LogoutButton)


