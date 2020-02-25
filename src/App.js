import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import NavbarTop from './components/TopNavbar';

function App() {
  return (
    <div className="App">
        <NavbarTop />
        <LoginForm />
    </div>
  );
}

export default App;
