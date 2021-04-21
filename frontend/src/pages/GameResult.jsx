import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import axios from 'axios';
// import Chart from '../components/Chart.jsx';
import Table from '../components/Table.jsx';

const GameResult = () => {
  const params = useParams();
  console.log(localStorage.getItem('token'));
  const [results, setResults] = React.useState([]);
  // const [numPlayers, setNumPlayers] = React.useState(Number);

  const getResults = async () => {
    const response = await axios.get(`http://localhost:5005/admin/session/${params.sid}/results`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.results);
      setResults(response.data.results);
      // setNumPlayers(response.data.results.length);
    }
  }

  // for chart that showers average response time for each question
  // const answerTime = (startTime, answerTime) => {
  //   const diff = new Date(answerTime) - new Date(startTime);
  //   const secondsDiff = diff / 1000;
  //   return secondsDiff;
  // }

  // for table of top 5 users and their score
  // const topResults = (results) => {
  //   need to map through the objects and DIY array then save that array brrr
  //   then sort them by correct answers to get the top 5
  // }

  useEffect(() => {
    getResults();
  });

  return (
    <div>
      <Header />
      <h2>Game {params.sid} Results</h2>
      {/* <Chart /> */}
      <Table />
      <br />
      <h5>Once the screen loads, it should display the following:</h5>
      <ul>
        <li>Table of up to top 5 users and their score</li>
        <li>Bar/Line chart showing a breakdown of what percentage of people (Y axis) got certain questions (X axis) correct</li>
        <li>Some chart showing the average response/answer time for each question</li>
        <li>Any other interesting information you see fit</li>
      </ul>
      {results.map(r => {
        console.log(r.answers);
        // for each player, for each question, console log whether they got the question right
        // r.answers.forEach(a => {
        //   console.log(a.correct)
        //   console.log('hi');
        // });
        return <div key={r.name}>{r.name}</div>
      })}
    </div>
  );
}

export default GameResult;
