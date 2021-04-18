import React from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';

const NewGame = () => {
  const [name, setName] = React.useState('');
  const addNew = async () => {
    const response = await axios.post('http://localhost:5005/admin/quiz/new', { name }, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('New quiz made :D');
    }
  }

  return (
    <div>
      <Header />
      <h2>New Game</h2>
      <TextField id="standard-basic" type="email" label="Name" onChange={e => setName(e.target.value)} value={name} /><br /><br />
      <div>
        <p>Upload Game (optional, .json files only)</p>
        <Input type="file" label="Image">Upload Game</Input>
      </div>
      <Button variant="contained" color="primary" onClick={addNew}>Create</Button>
    </div>
  );
}

export default NewGame;
