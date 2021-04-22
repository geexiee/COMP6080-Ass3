import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const GameResult = () => {
  const params = useParams();
  console.log('hi');
  // const [results, setResults] = React.useState([]);
  // const [numPlayers, setNumPlayers] = React.useState(Number);
  const [numQuestions, setNumQuestions] = React.useState(Number);
  const [percentPerQuestion, setPercentPerQuestion] = React.useState(Array);
  const [averageTime, setAverageTime] = React.useState(Array);
  const [topPlayers, setTopPlayers] = React.useState([]);
  // let percentPerQuestion = [];
  // let averageTime = [];

  // Get response time for a particular question
  const responseTime = (startTime, answerTime) => {
    const diff = new Date(answerTime) - new Date(startTime);
    const secondsDiff = diff / 1000;
    return secondsDiff;
  }

  // Analyse data to generate info for graphs
  const analyseResults = (results, numPlayers) => {
    if (results.length === 0) return;
    console.log(results);
    console.log(results[0].answers.length);
    setNumQuestions(results[0].answers.length);
    console.log(numQuestions);
    const correctPerQuestion = new Array(results[0].answers.length).fill(0);
    console.log(correctPerQuestion);
    const totalTimePerQuestion = new Array(results[0].answers.length).fill(0);
    console.log(totalTimePerQuestion);
    const playerScores = {};

    results.forEach(user => {
      playerScores[user.name] = 0;
      // setNumQuestions(user.answers.length);
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
    console.log(correctPerQuestion);
    console.log('%', correctPerQuestion.map((i) => i / numPlayers * 100));
    // Calculate percentage each question has been answered correctly
    // percentPerQuestion = correctPerQuestion.map((i) => i / numPlayers * 100);
    setPercentPerQuestion(correctPerQuestion.map((i) => i / numPlayers * 100));

    console.log(totalTimePerQuestion);
    console.log('time', totalTimePerQuestion.map((i) => i / numPlayers));
    // Calculate average response time per question
    // averageTime = totalTimePerQuestion.map((i) => i / numPlayers);
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
      // console.log(topPlayers);
      return topPlayers;
    })
    setTopPlayers(topPlayers);
  }

  // Option configuration for bar chart
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    title: {
      display: true,
      text: 'Breakdown of correct question responses'
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
    title: {
      display: true,
      text: 'Average question response time'
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

  // Table styles
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      width: '90%',
      margin: '0 5%',
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 350,
    },
  });
  const classes = useStyles();

  useEffect(() => {
    // Get results for a particular game session
    const getResults = async () => {
      const response = await axios.get(`http://localhost:5005/admin/session/${params.sid}/results`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).catch(e => console.log(e.response.data.error));
      console.log(response);
      if (response !== undefined && response.status === 200) {
        // setResults(response.data.results);
        // console.log(results);
        // setNumPlayers(response.data.results.length);
        analyseResults(response.data.results, response.data.results.length);
      }
    }

    getResults();
  }, []);

  return (
    <div>
      <Header />
      <h2>Game {params.sid} Results</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topPlayers.map((row, idx) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>{idx + 1}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.score}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Table /><br />
      <Bar data={barData} options={barOptions} /><br />
      <Line data={lineData} options={lineOptions} />
    </div>
  );
}

export default GameResult;
