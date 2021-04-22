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
  const [password2, setPassword2] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const registerUser = async () => {
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      alert('Please enter a valid email');
      return;
    }
    if (password !== password2) {
      alert("Passwords don't match, please try again");
      return;
    }
    if (email === '') {
      alert('Please enter an email');
    }
    if (password === '') {
      alert('Please enter a password');
    }
    if (name === '') {
      alert('Please enter a name');
    }
    const response = await axios.post('http://localhost:5005/admin/auth/register', {
      email,
      password,
      name,
    }).catch(e => alert(e.message));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
    } else {
      alert('A user with those details already exists');
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
        <TextField name="name" className="nameTextField" id="standard-basic" type="text" label="Name" onChange={e => setName(e.target.value)} value={name} /><br />
        <TextField name="email" className="emailTextField" id="standard-basic" type="email" label="Email" onChange={e => setEmail(e.target.value)} value={email} /><br />
        <TextField name="password" className="passwordTextField" id="standard-basic" type="text" label="Password" onChange={e => setPassword(e.target.value)} value={password} /><br />
        <TextField name="passwordConfirm" className="passwordConfirmTextField" id="standard-basic" type="text" label="Confirm Password" onChange={e => setPassword2(e.target.value)} value={password2} /><br /><br />
        <Button name="submitRegistrationButton" id="registerButton" variant="contained" color="primary" onClick={registerUser}>Register</Button>
      </div>
    </div>
  );
}

export default Register;
