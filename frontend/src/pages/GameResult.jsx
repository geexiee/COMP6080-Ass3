import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import Leaderboard from '../components/Leaderboard.jsx';

// Admin game result page function
const GameResult = () => {
  const params = useParams();
  const [numQuestions, setNumQuestions] = React.useState(Number);
  const [numPlayers, setNumPlayers] = React.useState(Number);
  const [percentPerQuestion, setPercentPerQuestion] = React.useState(Array);
  const [averageTime, setAverageTime] = React.useState(Array);
  const [topPlayers, setTopPlayers] = React.useState(Array);

  // Get results for a particular game session
  const getResults = async () => {
    const response = await axios.get(`http://localhost:5005/admin/session/${params.sid}/results`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      setNumPlayers(response.data.results.length);
      analyseResults(response.data.results, response.data.results.length);
    }
  }

  // Get response time for a particular question
  const responseTime = (startTime, answerTime) => {
    const diff = new Date(answerTime) - new Date(startTime);
    const secondsDiff = diff / 1000;
    return secondsDiff;
  }

  // Analyse data to generate info for graphs
  const analyseResults = (results, numPlayers) => {
    if (results.length === 0) return;
    setNumQuestions(results[0].answers.length);
    console.log(results[0].answers.length);
    const correctPerQuestion = new Array(results[0].answers.length).fill(0);
    const totalTimePerQuestion = new Array(results[0].answers.length).fill(0);
    const playerScores = {};

    results.forEach(user => {
      playerScores[user.name] = 0;
      let i = 0;
      (user.answers).forEach(answer => {
        totalTimePerQuestion[i] += responseTime(answer.questionStartedAt, answer.answeredAt)
        if (answer.correct === true) {
          correctPerQuestion[i] += 1;
          playerScores[user.name] += 1;
        }
        i++;
      })
    })

    // Calculate percentage each question has been answered correctly
    setPercentPerQuestion(correctPerQuestion.map((i) => i / numPlayers * 100));

    // Calculate average response time per question
    setAverageTime(totalTimePerQuestion.map((i) => i / numPlayers));

    // Calculate top 5 results
    const items = Object.keys(playerScores).map((key) => [key, playerScores[key]]);
    items.sort((first, second) => second[1] - first[1]);
    const top = items.slice(0, 5);
    const topPlayers = top.map(item => {
      const topPlayers = {
        name: item[0],
        score: item[1],
      };
      return topPlayers;
    })
    console.log(topPlayers);
    setTopPlayers(topPlayers);
  }

  // Option configuration for bar chart
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.value} %`
        }
      }
    }
  }

  // Option configuration for line chart
  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.value} s`
        }
      }
    }
  }

  // Generate labels to represent questions on the x-axis
  const generateLabels = (numQuestions) => {
    const labels = [];
    for (let i = 0; i < numQuestions; i++) {
      labels.push(i + 1);
    }
    return labels;
  }

  // Data for the bar chart
  const barData = {
    labels: generateLabels(numQuestions),
    datasets: [
      {
        label: 'Questions players answered correctly (%)',
        data: percentPerQuestion,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,1)',
      }
    ]
  };

  // Data for the line chart
  const lineData = {
    labels: generateLabels(numQuestions),
    datasets: [
      {
        label: 'Average question response time (s)',
        data: averageTime,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,1)',
        fill: false,
      }
    ]
  };

  const useStyles = makeStyles({
    page: {
      margin: 'auto',
      width: '90%',
      maxWidth: 1200,
    },
    title: {
      textAlign: 'center',
    },
  });
  const classes = useStyles();

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      <Header />
      <h2>Game {params.sid} Results</h2>
      {(numPlayers === 0 || numQuestions === 0) &&
        <h4>No results to display</h4>}
      {(numPlayers > 0 && numQuestions > 0) &&
        (
          <div>
            <div className={classes.page}>
              <h4 className={classes.title}>Player Leaderboard</h4>
              <Leaderboard data={topPlayers} />
              <br />
              <h4 className={classes.title}>Breakdown of correct question responses</h4>
              <Bar data={barData} options={barOptions} /><br />
              <h4 className={classes.title}>Average question response time</h4>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        )}
    </div>
  );
}

export default GameResult;
