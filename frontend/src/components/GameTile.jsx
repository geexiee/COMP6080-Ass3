import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { generatePath } from 'react-router';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const GameTile = (props) => {
  const { ID, name, owner, img } = props;

  const [goEditGame, setGoEditGame] = React.useState(false);
  if (goEditGame) {
    return <Redirect to={generatePath('/edit/:id', { id: ID })} />
  }

  const DeleteGame = async (ID) => {
    const response = await axios.delete(`http://localhost:5005/admin/quiz/${ID}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('Game Deleted!');
    }
  }

  const StartGame = async (ID) => {
    const response = await axios.post(`http://localhost:5005/admin/quiz/${ID}/start`, '', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('Game Started!');
    }
  }

  return (
    <Card border='primary' className="GameTile">
      <Card.Body>
        <Card.Title>Game ID: {ID}</Card.Title>
        <Card.Subtitle className="GameName">Game Name: {name}</Card.Subtitle>
        <Card.Text>
          Owner: {owner}
        </Card.Text>
        <Button className="CardButton" variant="secondary" size="sm" onClick={() => setGoEditGame(true)}>Edit Game</Button>
        <Button className="CardButton" variant="secondary" size="sm" onClick={() => DeleteGame(ID)}>Delete Game</Button><br />
        <Button className="CardButton" onClick={() => StartGame(ID)}>Start Game</Button>
      </Card.Body>
      <Card.Img variant='bottom' src={img}/>
    </Card>
  );
}

GameTile.propTypes = {
  ID: PropTypes.string,
  name: PropTypes.string,
  owner: PropTypes.string,
  img: PropTypes.img
};

export default GameTile;
