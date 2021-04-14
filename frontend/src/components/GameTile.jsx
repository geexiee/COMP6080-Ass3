import React from 'react';
import PropTypes from 'prop-types';
// import { Card } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { generatePath } from 'react-router';

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

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      width: 275,
      margin: 10,
    },
    media: {
      height: 140,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Game ID: {ID}
        </Typography>
        <Typography variant="h5" component="h2">
          Game Name: {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Owner: {owner}
        </Typography>
        <Typography variant="body2" component="p">
          <Button variant="outlined" size="small" onClick={() => setGoEditGame(true)}>Edit Game</Button>&nbsp;
          <Button variant="outlined" size="small" onClick={() => DeleteGame(ID)}>Delete Game</Button>&nbsp;
          <Button variant="contained" color="primary" size="small" onClick={() => StartGame(ID)}>Start Game</Button>
        </Typography>
      </CardContent>
      <CardMedia
        className={classes.media}
        image={img}
        title="Game Image"
      />
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
