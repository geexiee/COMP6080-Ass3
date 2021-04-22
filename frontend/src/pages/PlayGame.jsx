import React, { useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CardHeader } from '@material-ui/core';
import Confetti from 'react-confetti'

// User play game page function
const PlayGame = () => {

  // Calculate time left to answer a question
  const calculateTimeLeft = (currentTimeLeft) => {
    currentTimeLeft = currentTimeLeft - 1;
    return currentTimeLeft;
  }

  const params = useParams();
  const pid = params.pid;
  const [currentQuestionObject, setCurrentQuestionObject] = React.useState('');
  const [time, setTime] = React.useState(-1);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState('wait');
  const [playerResults, setPlayerResults] = React.useState([])

  // Checking if game has started (get out of waiting room)
  useEffect(() => {
    let interval = 0;
    if (gameStatus === 'wait') {
      interval = setInterval(() => {
        setStatus(pid);
      }, 1000);
    }
    return () => clearInterval(interval);
  });

  // Sets gameStatus to 'question' if the game has started (get out of waiting room)
  const setStatus = async (pid) => {
    console.log('aaaaaaa');
    const response = await axios.get(`http://localhost:5005/play/${pid}/status`)
      .catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      if (response.data.started) {
        console.log('host has started the game, gamestatus set to question');
        setGameStatus('question');
      }
    }
  }

  // When game status changes to question, set the current question
  // When game status changes to answer, set the current answer
  useEffect(() => {
    console.log('whats teh game status sir')
    if (gameStatus === 'question') {
      getCurrentQuestion(pid);
    } else if (gameStatus === 'answer') {
      getAns(pid)
    } else if (gameStatus === 'finished') {
      getGameResults(pid);
    }
  }, [gameStatus]);

  // Update the time remaining on the question
  useEffect(() => {
    if (gameStatus === 'question') {
      if (time > 0) {
        setTimeout(() => {
          setTime(calculateTimeLeft(time));
        }, 1000);
      }
      if (time === 0) {
        setGameStatus('answer');
      }
    }
  });

  // Every second, checks if the host has advanced the question (check current q)
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStatus === 'question' || (gameStatus === 'answer')) {
        getCurrentQuestion(pid);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  // Get results of game from api
  const getGameResults = async (pid) => {
    console.log('getting results');
    const response = await axios.get(`http://localhost:5005/play/${pid}/results`)
      .catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      const results = [];
      response.data.forEach(questionResult => {
        if (questionResult.correct === true) {
          results.push('Correct!');
        } else {
          results.push('Wrong!');
        }
      });
      setPlayerResults(results);
    }
  }

  // Get current question from api
  const getCurrentQuestion = async (pid) => {
    const response = await axios.get(`http://localhost:5005/play/${pid}/question`)
      .catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      const questionObject = response.data.question;
      if (questionObject.id !== currentQuestionObject.id) { // question has changed!
        setGameStatus('question');
        setSelectedAnswers([]);
        setTime(questionObject.timeLimit);
      }
      setCurrentQuestionObject(questionObject);
    } else { // no longer getting valid question, so the game must be over
      // request the results
      setGameStatus('finished');
    }
  }

  // Get correct answer from api
  const getAns = async (pid) => {
    const response = await axios.get(`http://localhost:5005/play/${pid}/answer`)
      .catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      const correctAnswerList = response.data.answerIds;
      const finalCorrectAnswerList = [];
      currentQuestionObject.answerList.forEach(answerOption => {
        if (correctAnswerList.includes(answerOption.id)) {
          const correctAnswerObject = {
            id: answerOption.id,
            answer: answerOption.answer
          }
          finalCorrectAnswerList.push(correctAnswerObject);
        }
      });
      setCorrectAnswers(finalCorrectAnswerList);
    }
  }

  // Submit user's answer to api
  const submitAns = async (pid, currSubmitAnsObj) => {
    let submitAnswerIds = [];
    if (currentQuestionObject.questionType === 'Multiple Choice') {
      // adding the selected answer to the answerlist or removing if its already there
      if (!(selectedAnswers.includes(currSubmitAnsObj))) {
        selectedAnswers.forEach(answer => {
          submitAnswerIds.push(answer.id);
        });
        submitAnswerIds.push(currSubmitAnsObj.id);
        setSelectedAnswers([...selectedAnswers, currSubmitAnsObj]);
      } else {
        const index = selectedAnswers.indexOf(currSubmitAnsObj);
        if (index > -1) {
          selectedAnswers.splice(index, 1);
          submitAnswerIds = [...selectedAnswers];
        }
      }
      const response = await axios.put(`http://localhost:5005/play/${pid}/answer`, {
        answerIds: submitAnswerIds
      }).catch(e => console.log(e.message));
      if (response !== undefined && response.status === 200) {
        console.log(response);
      }
    } else { // single choice question so we just send the id through by itself
      const response = await axios.put(`http://localhost:5005/play/${pid}/answer`, {
        answerIds: [currSubmitAnsObj.id]
      }).catch(e => console.log(e.message));
      if (response !== undefined && response.status === 200) {
        console.log(response);
        setSelectedAnswers([currSubmitAnsObj]);
      }
    }
  };

  // Lobby and game card styles
  const useStyles = makeStyles({
    root: {
      maxWidth: '90%',
      margin: '10px 5% 0px',
    },
    lobby: {
      width: '90%',
      margin: '5%',
      padding: '10%',
      textAlign: 'center',
      borderRadius: '5px',
      boxShadow: '0.5px 0.5px',
      WebkitTextStroke: '0.6px black',
      WebkitTextFillColor: 'white',
      background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,0.7838768115942029) 50%, rgba(252,176,69,1) 100%)',
    }
  });
  const classes = useStyles();

  return (
    <div>
      <Header />
      {(gameStatus === 'wait') &&
        <div className={classes.lobby}>
          <Confetti />
          <h3>WAITING FOR HOST TO START GAME 😃</h3>
        </div>
      }

      {(currentQuestionObject !== '') && (gameStatus === 'question') &&
        <Card className={classes.root}>
        <CardContent>
          <CardHeader title={`Question: ${currentQuestionObject.question}`} subheader={`Question Type: ${currentQuestionObject.questionType}`}></CardHeader>
          <p>Time Remaining: {time}</p>
          <p>video link: {currentQuestionObject.videoURL}</p>
          <p>image link: {currentQuestionObject.imgURL}</p>
        </CardContent>
        {(currentQuestionObject.imgURL !== '') &&
        <CardActionArea>
          <CardMedia
            component="img"
            alt="random image"
            height="250"
            image={currentQuestionObject.imgURL}
            title="Bonus pic"
          />
        </CardActionArea>}
        <CardActions>
          {currentQuestionObject.answerList.map(answerOption => (
            <Button key={answerOption.id} size="small" color="primary" variant="contained"
            onClick={() => submitAns(pid, answerOption)}
            >{answerOption.answer}</Button>
          ))}
        </CardActions>
      </Card>}

      {(gameStatus === 'answer') &&
        <div>
        <h2>Correct Answers!</h2>
        {correctAnswers.map(correctAnswer => (
          <p key={correctAnswer.id}>{correctAnswer.answer}</p>
        ))}
        <h2>Your Answers!</h2>
        {selectedAnswers.map(selectedAnswer => (
          <p key={selectedAnswer.id}>{selectedAnswer.answer}</p>
        ))}
      </div>}

      {(gameStatus === 'finished') &&
        <div>
          <h2>Game over! The host has ended the game!</h2>
          {playerResults.map((questionResult, index) => (
            <div key={index}>
              <p>Question: {index}, Result: {questionResult}</p>
            </div>
          ))}
        </div>}
    </div>
  );
}

export default PlayGame;
