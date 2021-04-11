import React from 'react';
import Header from '../components/Header.jsx';
import GameTile from '../components/GameTile.jsx';
import axios from 'axios';

const Dashboard = () => {
  const getGames = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5005/admin/quiz', {
      token
    }, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      return response.data.quizzes;
    }
  };

  getGames.then(console.log);

  return (
    <div>
      <Header />
      <h2>Dashboard</h2>
      <div className="GameTileContainer">
        <GameTile />
      </div>
    </div>
  );
}

export default Dashboard;
