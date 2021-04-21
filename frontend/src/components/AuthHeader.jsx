import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
      <Nav className="mr-auto">
        {/* <Nav.Link><Link to="/login">Login</Link></Nav.Link>
        <Nav.Link><Link to="/register">Register</Link></Nav.Link> */}
        <Nav><Link to="/login">Login</Link></Nav>
        <Nav><Link to="/register">Register</Link></Nav>
      </Nav>
    </Navbar>
  );
}

export default Header;
