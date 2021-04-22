import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import GameTile from '../components/GameTile.jsx'
import Button from '@material-ui/core/Button';

const Dashboard = () => {
  console.log(localStorage.getItem('token'))
  const [quizzes, setQuizzes] = React.useState([]);
  const GetQuizzes = async () => {
    const response = await axios.get('http://localhost:5005/admin/quiz', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      const quizArray = response.data.quizzes;
      setQuizzes(quizArray);
    }
  }

  useEffect(() => {
    GetQuizzes();
  }, []);

  return (
    <div>
      <Header />
      <h2>Dashboard</h2>
      <Button name="createNewGameButton" variant="contained" color="primary"><Link to="/new" style={{ color: 'white' }}>Create New Game</Link></Button>
      <div id="GameTileContainer">
        {quizzes.map((quiz) => {
          return (
            <GameTile key={quiz.id} ID={quiz.id} owner={quiz.owner} name={quiz.name} img='https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'/> // pass onclick as a prop, hardcoded img for now xd
          )
        }
        )}
      </div>
    </div>
  );
}

export default Dashboard;
