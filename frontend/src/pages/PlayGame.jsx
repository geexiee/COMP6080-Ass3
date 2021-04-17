import React from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';
import Header from '../components/Header.jsx';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';

const PlayGame = () => {
  const params = useParams();
  const pid = params.pid;
  const [question, setQuestion] = React.useState('');
  const [answers, setAnswers] = React.useState('');
  const [time, setTime] = React.useState(Number);
  const [video, setVideo] = React.useState('');
  const [img, setImg] = React.useState('');

  const getStatus = async (pid) => {
    const response = await axios.get(`http://localhost:5005/play/${pid}/status`)
      .catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.started);
    }
  }

  const getQuestion = async (pid) => {
    const response = await axios.get(`http://localhost:5005/play/${pid}/question`)
      .catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.question);
      setQuestion(response.data.question.question);
      setAnswers(response.data.question.allAnswers);
      // answers.forEach(a => console.log(a));
      console.log(answers);
      setTime(response.data.question.time);
      setVideo(response.data.question.url);
      setImg(response.data.question.photo);
    }
  }

  const getAns = async (pid) => {
    const response = await axios.get(`http://localhost:5005/play/${pid}/answer`)
      .catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.answerIds);
    }
  }

  const submitAns = async (pid) => {
    const response = await axios.put(`http://localhost:5005/play/${pid}/answer`, {
      answerIds: [0]
    }).catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      console.log(response);
    }
  };

  const getRes = async (pid) => {
    const response = await axios.put(`http://localhost:5005/play/${pid}/results`, {
      answerIds: [0]
    }).catch(e => console.log(e.message));
    if (response !== undefined && response.status === 200) {
      console.log(response);
    }
  };

  return (
    <div>
      <Header />
      <h2>Play Game :)</h2>
      <Button variant="contained" color="primary" onClick={() => getStatus(pid)}>Get status</Button><br />
      <Button variant="contained" color="primary" onClick={() => getQuestion(pid)}>Get question</Button><br />
      {question}<br />
      {answers}<br />
      time: {time}<br />
      {video}<br />
      {img}<br />
      <p>make answers clickable :))))))))))</p>
      <Button variant="contained" color="primary" onClick={() => getAns(pid)}>Get answer</Button><br />
      <Button variant="contained" color="primary" onClick={() => submitAns(pid)}>Submit answer</Button><br />
      <Button variant="contained" color="primary" onClick={() => getRes(pid)}>Get results</Button>
      <p>{pid}</p>
    </div>
  );
}

export default PlayGame;
