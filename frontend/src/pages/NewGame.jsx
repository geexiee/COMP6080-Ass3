import React from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import { ReadFile } from '../functions/ReadFile.js'
import { Redirect } from 'react-router-dom';

// New game page function for admin
const NewGame = () => {
  const [name, setName] = React.useState('');
  const [file, setFile] = React.useState('');
  const [goBack, setGoBack] = React.useState(false);

  // Handle admin creation of new game including file upload
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
        if (file.name.split('.').pop().toLowerCase() === 'json') {
          ReadFile(file, response.data.quizId, name);
        } else {
          alert('Please attach json files only');
        }
      } else {
        alert('A new empty game has been created!')
      }
      setGoBack(true);
    }
  }

  // Show admin dashboard again after they create new game
  if (goBack) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div>
      <Header />
      <h2>New Game</h2>
      <TextField name="gameName" id="standard-basic" type="email" label="Name" onChange={e => setName(e.target.value)} value={name} /><br /><br />
      <div>
        <p>Upload Game (optional, .json files only)</p>
        <Input type="file" label="Image" onInput={ e => setFile(e.target.files[0])}>Upload Game</Input>
      </div>
      <Button name="createButton" variant="contained" color="primary" onClick={handleCreateNewGame}>Create</Button>
    </div>
  );
}

export default NewGame;
