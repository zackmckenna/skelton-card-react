import React from 'react'
import { connect } from 'react-redux'
import { MDBBtn } from 'mdbreact'
import { Button } from 'react-bootstrap'
import { logoutUser } from '../../redux/ducks/login'

const mapDispatchToProps = {
  logoutUser
}

const LogoutButton = (props) => {

  const handleLogout = () => {
    props.logoutUser()
  }

  return (
    <Button onClick={() => handleLogout()}>
      Logout
    </Button>
  )
}

export default connect(null, mapDispatchToProps)(LogoutButton)


