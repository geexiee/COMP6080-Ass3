import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = async () => {
    console.log(email, password);
    const response = await axios.post('http://localhost:5005/admin/auth/login', {
      email,
      password,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).catch(e => console.log(e.message));
    // This doesnt appear to catch the error not sure why I think possibly my
    // method of sending the api request is broken, but also it works sometimes  ¯\_(ツ)_/¯
    console.log(response);
    if (response.status === 200) {
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
      <h2>Login</h2>
      Email: <input onChange={e => setEmail(e.target.value)} value={email} type="email" /><br />
      Password: <input onChange={e => setPassword(e.target.value)} value={password} type="text" /><br />
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;
