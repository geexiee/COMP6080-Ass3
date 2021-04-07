import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Header = () => {
  const logoutUser = async () => {
    const response = await axios.post('http://localhost:5005/admin/auth/register', {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    if (response.status === 200) {
      localStorage.removeItem('token');
      console.log('Logged out!');
    }
  }
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link><Link to="/login">Login</Link></Nav.Link>
        <Nav.Link><Link to="/register">Register</Link></Nav.Link>
        <Nav.Link><Link to="/dashboard">Dashboard</Link></Nav.Link>
        <Nav.Link>Normal colour</Nav.Link>
      </Nav>
      <Form inline>
        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
        {/* <Button variant="outline-primary">Search</Button> */}
        <Button onClick={logoutUser} variant="outline-primary">Logout</Button>
      </Form>
    </Navbar>
  );
}

export default Header;
