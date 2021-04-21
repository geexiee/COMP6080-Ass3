import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav style={{ padding: 10 }}><Link to="/login">Login</Link></Nav>
        <Nav style={{ padding: 10 }}><Link to="/register">Register</Link></Nav>
      </Nav>
    </Navbar>
  );
}

export default Header;
