import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Button from 'react-bootstrap/Button';

const Logout = () => {
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

  return <Button onClick={logoutUser} variant="outline-primary">Logout</Button>;
}

export default Logout;
