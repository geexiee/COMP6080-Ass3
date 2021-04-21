import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Logout from './LogoutBtn.jsx';

const Header = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav style={{ padding: 10 }}><Link to="/dashboard">Dashboard</Link></Nav>
        <Nav style={{ padding: 10 }}><Link to="/join">Join Game</Link></Nav>
      </Nav>
      <Form inline>
        <Logout />
      </Form>
    </Navbar>
  );
}

export default Header;
