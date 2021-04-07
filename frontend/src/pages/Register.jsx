import React from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';

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
    });
    console.log(response.data.token);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
    //   return <Redirect to="/" />;
    }
  };

  return (
    <div>
      <h2>Register</h2>
      Name: <input onChange={e => setName(e.target.value)} value={name} type="text" /><br />
      Email: <input onChange={e => setEmail(e.target.value)} value={email} type="email" /><br />
      Password: <input onChange={e => setPassword(e.target.value)} value={password} type="text" /><br />
      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;
