import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from '../components/AuthHeader.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const registerUser = async () => {
    console.log(email, password, name);
    const response = await axios.post('http://localhost:5005/admin/auth/register', {
      email,
      password,
      name,
    }).catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.token);
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
    }
  };

  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Header />
      <h2>Register</h2>
      <TextField name="name" className="nameTextField" id="standard-basic" type="text" label="Name" onChange={e => setName(e.target.value)} value={name} /><br />
      <TextField name="email" className="emailTextField" id="standard-basic" type="email" label="Email" onChange={e => setEmail(e.target.value)} value={email} /><br />
      <TextField name="password" className="passwordTextField" id="standard-basic" type="text" label="Password" onChange={e => setPassword(e.target.value)} value={password} /><br /><br />
      <Button name="submitRegistrationButton" variant="contained" color="primary" onClick={registerUser}>Register</Button>
    </div>
  );
}

export default Register;
