import React from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { generatePath, Redirect, useParams } from 'react-router';

const JoinGame = () => {
  const params = useParams();
  const [sid, setSID] = React.useState(params.sid ? params.sid : '');
  const [name, setName] = React.useState('');
  const [pid, setPID] = React.useState('');
  const [goPlay, setGoPlay] = React.useState(false);

  const joinGame = async (sid, name) => {
    if (name === '') {
      alert('Please enter a name');
    }
    const response = await axios.post(`http://localhost:5005/play/join/${sid}`, { name })
      .catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      setPID(response.data.playerId);
      console.log(name, 'joined game ', sid, 'with pid ', pid);
      setGoPlay(true);
    }
  };

  // Redirect user to the play game page after joining a game
  if (goPlay) {
    console.log('playerid is: ', pid);
    return <Redirect to={generatePath('/play/:pid', { pid: pid })} />
  }

  return (
    <div>
      <Header />
      <div className="PageBody">
        <h2>Join Game</h2>
        <TextField label="Session ID" onChange={e => setSID(e.target.value)} value={sid} /><br />
        <TextField label="Name" onChange={e => setName(e.target.value)} value={name} /><br /><br />
        <Button variant="contained" color="primary" onClick={() => joinGame(sid, name)}>Join Game</Button>
      </div>
    </div>
  );
}

export default JoinGame;
