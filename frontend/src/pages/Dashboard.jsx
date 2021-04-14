import React, { useEffect } from 'react';
import Header from '../components/Header.jsx';
import axios from 'axios';
import GameTile from '../components/GameTile.jsx'
// import Button from 'react-bootstrap/Button'
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
      <Button variant="contained" color="primary">Create New Game</Button>
      <div onClick={() => { navigator.clipboard.writeText('whats up nerd') }}>📋</div>
      {/* <div onClick={() => { navigator.clipboard.writeText(this.state.textToCopy) }}>📋</div> */}
      <div id="GameTileContainer">
        {quizzes.map((quiz) => {
          return (
            <GameTile key={quiz.id} ID={quiz.id} owner={quiz.owner} name={quiz.name} img='https://lh3.googleusercontent.com/DOVLakwMtZA4sDq8lW9Vgn6U0c0vD5ffGVQiYPGyerU8NKALGxOJXq6XN--bc74IYOpwHK2dyD5uhzYNuMlhhvzayvXn0I3yo78g4a6K-d33voaa4ir-XUsIXh3f4WPCaqY4Pkp9J5FRjB6QAytgsdNlVlNBIvoT_RRmzzyDe2pgpZtLyxGNVVyyVyMqFcdVWzoXeshtpeI9Yf-CTjYtcAKBumH-NNr-TyNJ5K6-3bNI9ZOml6tc31VFqeb8ASPffxRrGG7_c9xmyRdJ-VEwa4JfwNHgSkOYGCW88577e5ztGo3kbkct-c2eVtiqFUOBUh-xCakdGIqTzNz55CWancyZl4ZV-YyAKyziZbK1rHbQ9KO3e7RG30RShxKabAD51mYEri_FNtQLfe3V8XL5BfrVY_KSo9pUMOMWnPRBq2vNAH95KI2cWyMJ1AmWNzSE_fIVQQQYLuTVAYX6dNyabb0jngZhK7WzNZlGpBK8A22VrPYsraTjgtHei6oAwKqE-_7-Aeh79qHIvzO4KFvjmWl0whjRFC9rrzxO0B6ggKclovmj0cCl55t2VMZ-mGgXtaaSz_N_SisDaRmgMwy03E0Zi8yBOEYBYtE_Df9PqjNCYJ3LGkFNEG_vC9bj3X2OBJHyiOrkyXz_nJ2Cwh3QUga6KeeNmINYcWvPANFrwqVma4W5JcrQKppN6eK1HIuddzzUlpAur8g2XnagGQLBIBhu=w876-h1057-no?authuser=0'/> // pass onclick as a prop, hardcoded img for now xd
          )
        }
        )}
      </div>
    </div>
  );
}

export default Dashboard;
