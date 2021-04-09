import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const Header = () => {
  const logoutUser = async () => {
    console.log(localStorage.getItem('token'));
    const response = await axios.post('http://localhost:5005/admin/auth/logout', '', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('Logged out!');
      localStorage.removeItem('token');
      setLoggedIn(false);
    }
  };

  const [loggedIn, setLoggedIn] = React.useState(true);
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
      <Nav className="mr-auto">
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
