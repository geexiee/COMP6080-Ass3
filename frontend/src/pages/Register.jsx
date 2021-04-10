import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from '../components/AuthHeader.jsx';

const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const registerUser = async () => {
    console.log(email, password, name);
    const response = await axios.post('http://localhost:5005/admin/auth/register', {
      email,
      password,
      name,
    }).catch(e => console.log(e.message));
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
      <Header />
      <h2>Register</h2>
      Name: <input onChange={e => setName(e.target.value)} value={name} type="text" /><br />
      Email: <input onChange={e => setEmail(e.target.value)} value={email} type="email" /><br />
      Password: <input onChange={e => setPassword(e.target.value)} value={password} type="text" /><br />
      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;
