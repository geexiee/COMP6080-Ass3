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
import Tooltip from '@material-ui/core/Tooltip';

const GameTile = (props) => {
  const { ID: gameID, name, owner, img } = props;
  const [goEditGame, setGoEditGame] = React.useState(false);
  const [goResults, setGoResults] = React.useState(false);
  const [openStart, setOpenStart] = React.useState(false);
  const [openRes, setOpenRes] = React.useState(false);
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

  const deleteGame = async (gameID) => {
    const response = await axios.delete(`http://localhost:5005/admin/quiz/${gameID}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => alert(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('Game Deleted!');
    }
  }

  const startGame = (gameID) => {
    axios.post(`http://localhost:5005/admin/quiz/${gameID}/start`, '', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => alert(e.response.data.error));
  }

  const advanceGame = async (gameID) => {
    const response = await axios.post(`http://localhost:5005/admin/quiz/${gameID}/advance`, '', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => alert(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('Game Advanced!', gameID);
    }
  }

  const stopGame = (gameID) => {
    axios.post(`http://localhost:5005/admin/quiz/${gameID}/end`, '', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => alert(e.response.data.error));
  }

  const getSessionId = async () => {
    const response = await axios.get(`http://localhost:5005/admin/quiz/${gameID}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => alert(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.active);
      setSessionID(response.data.active);
    }
  }

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      width: 350,
      marginTop: 10,
      marginRight: 10,
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

  const handleOpenStart = () => {
    setOpenStart(true);
  };

  const handleCloseStart = () => {
    setOpenStart(false);
  };

  const handleOpenRes = () => {
    setOpenRes(true);
  };

  const handleCloseRes = () => {
    setOpenRes(false);
  };

  const bodyStart = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="gameModalTitle">Game Started</h2>
      <p id="gameModalDescription">
        Here is the session code:
      </p>
      <h1>{sessionID}</h1>
      <div>
        <Tooltip title="Copy to clipboard" placement="right">
          <IconButton size="small" onClick={() => {
            navigator.clipboard.writeText(`localhost:3000/join/${sessionID}`)
          }}>📋
          </IconButton>
        </Tooltip>
      </div>
      <br />
      <Button id="stopGameButton" variant="outlined" onClick={ () => {
        console.log('Stop game: ', gameID);
        stopGame(gameID);
        handleCloseStart();
        handleOpenRes();
      }}>Stop Game</Button>&nbsp;
      <Button id="advanceGameButton" variant="outlined" onClick={ () => {
        console.log('Advance game: ', gameID);
        advanceGame(gameID);
      }}>Advance Game</Button>
    </div>
  );

  if (goEditGame) {
    return <Redirect to={generatePath('/edit/:id', { id: gameID })} />
  }

  if (goResults) {
    return <Redirect to={generatePath('/results/:id', { id: sessionID })} />
  }

  const bodyRes = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Game Stopped</h2>
      <p id="simple-modal-description">Would you like to view the results?</p>
      <Button name="yesButtonViewResults" color="primary" onClick={ () => {
        console.log('gang');
        setGoResults(true);
      }}>Yes</Button>
      <Button onClick={ () => handleCloseRes() }>No</Button>
    </div>
  );

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom id="gameID">
          Game ID: {gameID}
        </Typography>
        <Typography variant="h5" component="h2" id="gameName">
          Game Name: {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" id="gameOwner">
          Owner: {owner}
        </Typography>
        <Typography variant="body2" component="p">
          <Button name="editGameButton" variant="outlined" size="small" onClick={() => setGoEditGame(true)} className="editGameButton">Edit Game</Button>&nbsp;
          <Button variant="outlined" color="secondary" size="small" onClick={() => deleteGame(gameID)} className="deleteGameButton">Delete Game</Button><br /><br />
          <Button name="startGameButton" id="startGameButton" variant="contained" size="small" color="primary"
            onClick={() => {
              startGame(gameID);
              handleOpenStart();
              getSessionId();
            }}>Start Game</Button>
          {/* Start Game modal */}
          <Modal
            open={openStart}
            onClose={handleCloseStart}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {bodyStart}
          </Modal>
          {/* Results modal */}
          <Modal
            open={openRes}
            onClose={handleCloseRes}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {bodyRes}
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
  ID: PropTypes.number,
  name: PropTypes.string,
  owner: PropTypes.string,
  img: PropTypes.string
};

export default GameTile;
