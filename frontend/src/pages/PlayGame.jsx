import React, { useEffect } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router';
import Header from '../components/Header.jsx';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
// import AnswerCard from '../components/AnswerCard.jsx'

const PlayGame = () => {
  const calculateTimeLeft = (currentTimeLeft) => {
    currentTimeLeft = currentTimeLeft - 1;
    return currentTimeLeft;
  }

  const params = useParams();
  const pid = params.pid;
  const [question, setQuestion] = React.useState('');
  const [answers, setAnswers] = React.useState([]);
  const [time, setTime] = React.useState(0);
  const [video, setVideo] = React.useState('');
  const [img, setImg] = React.useState('');

  useEffect(() => {
    getQuestion(pid);
  }, []);

  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        // console.log(answers, typeof (answers));
        setTime(calculateTimeLeft(time));
      }, 1000);
    }
  });

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
      const questionObject = response.data.question;
      console.log('question object is: ', questionObject, 'type: ', typeof (questionObject));
      console.log('answerlist is: ', questionObject.answerList, 'type: ', typeof (questionObject.answerList));
      // const ansArray = [];
      // for (const i in questionObject.answerList) {
      //   ansArray.push(questionObject.answerList[i]);
      // }
      // console.log('answer array is: ', ansArray, 'type is: ', typeof (ansArray));
      // setAnswers(questionObject.answerList);
      // console.log(questionObject.answerList);
      setQuestion(questionObject.question);
      // console.log(ansArray);
      setAnswers(questionObject.answerList);
      // answers.forEach(a => console.log(a));
      setTime(Number(questionObject.timeLimit));
      setVideo(questionObject.videoURL);
      setImg(questionObject.imageURL);
      // questionObject.answerList.forEach(answer => {
      //   console.log(answer);
      // })
      console.log(answers);
      console.log(questionObject.answerList, typeof (questionObject.answerList));
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
      <h2>{question}</h2>
      {answers.map(answer => (
        <p key = {answer.id}>{answer.answer}</p>
      ))}
      {/* <AnswerCard answer={answer[0].answer}></AnswerCard> */}
      {/* {answers.forEach(answer => {
        return (
          <div>{answer}</div>
        );
      })} */}
      {/* {answers}<br /> */}
      time: {time}<br />
      video link: {video}<br />
      image link: {img}<br />
      <Button variant="contained" color="primary" onClick={() => getStatus(pid)}>Get status</Button><br />
      <Button variant="contained" color="primary" onClick={() => getQuestion(pid)}>Get question</Button><br />
      <Button variant="contained" color="primary" onClick={() => getAns(pid)}>Get answer</Button><br />
      <Button variant="contained" color="primary" onClick={() => submitAns(pid)}>Submit answer</Button><br />
      <Button variant="contained" color="primary" onClick={() => getRes(pid)}>Get results</Button><br />
      player id: <p>{pid}</p>
    </div>
  );
}

export default PlayGame;
