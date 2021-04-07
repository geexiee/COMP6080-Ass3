import React from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = async () => {
    console.log(email, password);
    const response = await axios.post('http://localhost:5005/admin/auth/login', {
      email,
      password,
    });
    console.log(response.data.token);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
    //   return <Redirect to="/" />;
    }
  };

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
