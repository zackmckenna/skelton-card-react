import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { HashRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import LogoutButton from './buttons/LogoutButton'
import LeaveRoomButton from './buttons/LeaveRoomButton'

const NavbarTop = () => {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">skeleton card</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link to='/'>Home</Nav.Link>
            <Nav.Link to='/lobby'>Lobby</Nav.Link>
            <LeaveRoomButton />
            <LogoutButton />
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    login: state.login,
  }
}

export default connect(mapStateToProps)(NavbarTop)
