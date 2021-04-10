import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
import Logout from './LogoutBtn.jsx';

const Header = () => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link><Link to="/dashboard">Dashboard</Link></Nav.Link>
        <Nav.Link><Link to="/new">New Game</Link></Nav.Link>
      </Nav>
      <Form inline>
        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
        {/* <Button variant="outline-primary">Search</Button> */}
        <Logout />
      </Form>
    </Navbar>
  );
}

export default Header;
