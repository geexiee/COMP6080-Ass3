import React, { useEffect } from 'react';
import { useParams, generatePath } from 'react-router';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Button from '@material-ui/core/Button';
import QuestionTile from '../components/QuestionTile.jsx'

// Admin edit game page function
const EditGame = () => {
  const params = useParams();
  const [questions, setQuestions] = React.useState([]);
  const [goAddQuestion, setGoAddQuestion] = React.useState(false);
  const [gameName, setGameName] = React.useState('');

  // Get questions in a game
  const getQuestions = async () => {
    const response = await axios.get(`http://localhost:5005/admin/quiz/${params.gid}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      setQuestions(response.data.questions);
      setGameName(response.data.name);
    }
  }

  // Get game's questions on load
  useEffect(() => {
    getQuestions();
  }, []);

  // Redirect user to add question page after button click
  if (goAddQuestion) {
    return <Redirect to={generatePath('/add/:gid/', { gid: params.gid })} />
  }

  return (
    <div>
      <Header />
      <div className="PageBody">
        <h2>Game Name: {gameName}</h2>
        <p>Game ID: {params.gid}</p>
        <div id="QuestionTileDiv">
          {questions.map((q) => {
            return (
              <QuestionTile key={q.id} qid={q.id} question={q.question} timeLimit={q.timeLimit} points={q.points} imageURL={q.imageURL} gid={params.gid} videoURL={q.videoURL}/> // pass onclick as a prop, hardcoded img for now xd
            );
          }
          )}
        </div>
        <Button name="addNewQuestionButton" onClick={() => setGoAddQuestion(true)} variant="contained" size="small">Add new question</Button>
      </div>
    </div>
  );
}

export default EditGame;
