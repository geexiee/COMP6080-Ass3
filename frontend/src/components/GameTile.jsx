import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { generatePath } from 'react-router';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';

const GameTile = (props) => {
  const { ID, name, owner, img } = props;
  const [goEditGame, setGoEditGame] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [sessionID, setSessionID] = React.useState('');

  const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [modalStyle] = React.useState(getModalStyle);

  if (goEditGame) {
    return <Redirect to={generatePath('/edit/:id', { id: ID })} />
  }

  const deleteGame = async (ID) => {
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

  const startGame = async (ID) => {
    const response = await axios.post(`http://localhost:5005/admin/quiz/${ID}/start`, '', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('Game Started!', ID);
    }
  }

  const advanceGame = async (ID) => {
    const response = await axios.post(`http://localhost:5005/admin/quiz/${ID}/advance`, '', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('Game Advanced!', ID);
    }
  }

  const stopGame = async (ID) => {
    const response = await axios.post(`http://localhost:5005/admin/quiz/${ID}/end`, '', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('Game Stopped!', ID);
    }
  }

  const getSessionId = async () => {
    const response = await axios.get(`http://localhost:5005/admin/quiz/${ID}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.active);
      setSessionID(response.data.active);
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
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: 'white',
      border: '2px solid #000',
      boxShadow: '1px 1px',
      textAlign: 'center',
      padding: '2px 5px 3px',
      margin: '2px',
    },
  });
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Game Started</h2>
      <p id="simple-modal-description">
        Here is the session code:
        <h1>{sessionID}</h1>
        <IconButton size="small"><div onClick={() => {
          navigator.clipboard.writeText(`localhost:3000/join/${sessionID}`)
        }}>📋</div></IconButton>
      </p>
      <Button onClick={ () => {
        console.log('Stop game: ', ID);
        stopGame(ID);
        handleClose();
      }}>Stop Game</Button>
      <Button onClick={ () => {
        console.log('Advance game: ', ID);
        advanceGame(ID);
      }}>Advance Game</Button>
    </div>
  );

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
          <Button variant="outlined" size="small" onClick={() => deleteGame(ID)}>Delete Game</Button><br /><br />
          <Button variant="contained" size="small" color="primary"
            onClick={() => {
              startGame(ID);
              handleOpen();
              getSessionId();
            }}>Start Game</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
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
