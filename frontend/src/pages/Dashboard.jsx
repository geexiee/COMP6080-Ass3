import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import axios from 'axios';
import GameTile from '../components/GameTile.jsx'
import Button from '@material-ui/core/Button';

// Admin dashboard page function
const Dashboard = () => {
  const [games, setGames] = React.useState([]);

  // Get games hosted by logged-in admin
  const getGames = async () => {
    const response = await axios.get('http://localhost:5005/admin/quiz', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      const quizArray = response.data.quizzes;
      setGames(quizArray);
    }
  }

  // Get admin games on page load
  useEffect(() => {
    getGames();
  }, []);

  return (
    <div>
      <Header />
      <div className="PageBody">
        <h2>Dashboard</h2>
        <Button name="createNewGameButton" variant="contained" color="primary">
          <Link to="/new" style={{ color: 'white' }}>Create New Game</Link>
        </Button>
        <div id="GameTileContainer">
          {games.map((game) => {
            return (
              <GameTile
                key={game.id}
                ID={game.id}
                owner={game.owner}
                name={game.name}
                img='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png' />
                // pass onclick as a prop, hardcoded img for now xd
            )
          }
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
