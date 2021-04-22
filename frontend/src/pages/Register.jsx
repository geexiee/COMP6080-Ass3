import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from '../components/AuthHeader.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// User register function
const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const registerUser = async () => {
    if (email === '') {
      alert('Please enter an email');
    }
    if (password === '') {
      alert('Please enter a password');
    }
    if (name === '') {
      alert('Please enter a name');
    }
    console.log(email, password, name);
    const response = await axios.post('http://localhost:5005/admin/auth/register', {
      email,
      password,
      name,
    }).catch(e => alert(e.message));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
    }
  };

  // Show user the dashboard after registering successfully
  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Header />
      <div className="PageBody">
        <h2>Register</h2>
        <TextField id="name" type="text" label="Name" onChange={e => setName(e.target.value)} value={name} /><br />
        <TextField id="email" type="email" label="Email" onChange={e => setEmail(e.target.value)} value={email} /><br />
        <TextField id="password" type="password" label="Password" onChange={e => setPassword(e.target.value)} value={password} /><br /><br />
        <Button variant="contained" color="primary" onClick={registerUser}>Register</Button>
      </div>
    </div>
  );
}

export default Register;
