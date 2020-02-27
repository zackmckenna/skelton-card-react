import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import NavbarTop from './components/TopNavbar';
import userService from './services/user'

 const App = () => {
   useEffect(() => {
     console.log(userService.getAll())
   })

  return (
    <div className="App">
        <NavbarTop />
        <LoginForm />=
    </div>
  );
}

export default App;
