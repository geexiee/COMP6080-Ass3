import React, { useEffect } from 'react';
import { useParams, generatePath } from 'react-router';
import Header from '../components/Header.jsx';
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const EditGame = () => {
  const params = useParams();

  const GetQuestions = async () => {
    const response = await axios.get(`http://localhost:5005/admin/quiz/${params.gid}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.questions);
    }
  }

  useEffect(() => {
    GetQuestions();
  });

  const [goEditQuestion, setGoEditQuestion] = React.useState(false);
  if (goEditQuestion) {
    console.log(generatePath('/edit/:gid/:qid', { gid: params.gid, qid: 1 }))
    return <Redirect to={generatePath('/edit/:gid/:qid', { gid: params.gid, qid: 1 })} />
  }

  const [goDeleteQuestion, setGoDeleteQuestion] = React.useState(false);
  if (goDeleteQuestion) {
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
      <Button>Add new question</Button>
      <p># put /admin/quiz/{params.gid} with new question - redirect to edit question to input info?</p>
      <ul>
        <li>Allows users to select the question they want to edit</li>
        <li>Allows users to delete a particular question, or add a new question</li>
      </ul>
      <Button onClick={() => setGoEditQuestion(true)} size="sm">Edit question</Button>&nbsp;
      <Button onClick={() => setGoDeleteQuestion(true)} size="sm">Delete question</Button>
      <p># Attach these to each question block</p>
    </div>
  );
}

export default EditGame;
