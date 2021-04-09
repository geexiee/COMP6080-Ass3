import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from '../components/AuthHeader.jsx';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = async () => {
    console.log(email, password);
    // const data = { email, password, }
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

  const [loggedIn, setLoggedIn] = React.useState(false);
  if (loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Header />
      <h2>Login</h2>
      Email: <input onChange={e => setEmail(e.target.value)} value={email} type="email" /><br />
      Password: <input onChange={e => setPassword(e.target.value)} value={password} type="text" /><br />
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;
