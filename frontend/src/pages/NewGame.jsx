import React from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import { ReadFile } from '../functions/ReadFile.js'

const NewGame = () => {
  const [name, setName] = React.useState('');
  const [file, setFile] = React.useState('');

  const handleCreateNewGame = async () => {
    let response = await axios.get('http://localhost:5005/admin/quiz', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    response = await axios.post('http://localhost:5005/admin/quiz/new', { name }, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      if (file !== '') {
        ReadFile(file, response.data.quizId, name);
      } else {
        alert('No file uploaded, thats cool :) A new empty game has been created!')
      }
    }
  }

  return (
    <div>
      <Header />
      <h2>New Game</h2>
      <TextField id="standard-basic" type="email" label="Name" onChange={e => setName(e.target.value)} value={name} /><br /><br />
      <div>
        <p>Upload Game (optional, .json files only)</p>
        <Input type="file" label="Image" onInput={ e => setFile(e.target.files[0])}>Upload Game</Input>
      </div>
      <Button variant="contained" color="primary" onClick={handleCreateNewGame}>Create</Button>
    </div>
  );
}

export default NewGame;
