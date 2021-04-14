import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from '../components/AuthHeader.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const loginUser = async () => {
    console.log(email, password);
    const response = await axios.post('http://localhost:5005/admin/auth/login', {
      email,
      password
    }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch(e => console.log(e.response.data.error));
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
      <h2>Login</h2>
      <TextField id="standard-basic" type="email" label="Email" onChange={e => setEmail(e.target.value)} value={email} /><br />
      <TextField id="standard-basic" type="text" label="Password" onChange={e => setPassword(e.target.value)} value={password} /><br /><br />
      <Button variant="contained" color="primary" onClick={loginUser}>Login</Button>
    </div>
  );
}

export default Login;
