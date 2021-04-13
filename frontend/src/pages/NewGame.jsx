import React from 'react';
import Header from '../components/Header.jsx';
import axios from 'axios';
import Button from 'react-bootstrap/Button'

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
      Name: <input onChange={e => setName(e.target.value)} value={name} type="text" />&nbsp;
      <Button onClick={addNew} size="sm">Create</Button>
    </div>
  );
}

export default NewGame;
