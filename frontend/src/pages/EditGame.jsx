import React, { useEffect } from 'react';
import { useParams, generatePath } from 'react-router';
import Header from '../components/Header.jsx';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import QuestionTile from '../components/QuestionTile.jsx'

const EditGame = () => {
  const params = useParams();
  const [questions, setQuestions] = React.useState([]);
  const [goEditQuestion, setGoEditQuestion] = React.useState(false);
  const [goDeleteQuestion, setGoDeleteQuestion] = React.useState(false);

  const GetQuestions = async () => {
    const response = await axios.get(`http://localhost:5005/admin/quiz/${params.gid}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      setQuestions(response.data.questions);
    }
  }

  useEffect(() => {
    GetQuestions();
  }, []);

  if (goEditQuestion) {
    console.log(generatePath('/edit/:gid/:qid', { gid: params.gid, qid: 1 }))
    return <Redirect to={generatePath('/edit/:gid/:qid', { gid: params.gid, qid: 1 })} />
  }

  if (goDeleteQuestion) {
    console.log('trying to delete q');
    // put /admin/quiz/{params.gid} with deleted question</p>
    // have question be indexed and just remove that one from the array
    // const response = await axios.put('http://localhost:5005/admin/quiz', {
    //   [[[[body]]]]
    // }, {
    //   headers: {
    //     Accept: 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   }
    // }).catch(e => console.log(e.response.data.error));
    // if (response !== undefined && response.status === 200) {
    //   console.log('deleted question :>');
    // }
  }

  return (
    <div>
      <Header />
      <h2>Edit Game</h2>
      <p>Game ID: {params.gid}</p>
      <p>get id with /admin/quiz/{params.gid}</p>
      <Button onClick={() => setGoEditQuestion(true)}>Add new question</Button>
      <p># put /admin/quiz/{params.gid} with new question - redirect to edit question to input info?</p>
      <ul>
        <li>Allows users to select the question they want to edit</li>
        <li>Allows users to delete a particular question, or add a new question</li>
      </ul>
      <div id="QuestionTileDiv">
        {questions.map((question) => {
          console.log(question);
          return (
            <QuestionTile key={question.id} qid={question.id} question={question.question} timeLimit={question.timeLimit} points={question.points} imageURL={question.imageURL} gid={params.gid}/> // pass onclick as a prop, hardcoded img for now xd
          );
        }
        )}
      </div>
      <Button onClick={() => setGoEditQuestion(true)} size="sm">Edit question</Button>&nbsp;
      <Button onClick={() => setGoDeleteQuestion(true)} size="sm">Delete question</Button>
      <p># Attach these to each question block</p>
    </div>
  );
}

export default EditGame;
