import React from 'react';
import { useParams } from 'react-router';
import Header from '../components/Header.jsx';

const EditGame = () => {
  const params = useParams();
  return (
    <div>
      <Header />
      <h2>Edit Game</h2>
      <p>Game ID: {params.gid}</p>
      <p>get id with /admin/quiz/{params.gid}</p>
      <button>Edit question</button>
      <p># redirect to edit page w/ question no</p>
      <button>Delete question</button>
      <p># put /admin/quiz/{params.gid} with deleted question</p>
      <button>Add new question</button>
      <p># put /admin/quiz/{params.gid} with new question - redirect to edit question to input info?</p>
      <ul>
        <li>Allows users to select the question they want to edit</li>
        <li>Allows users to delete a particular question, or add a new question</li>
      </ul>
    </div>
  );
}

export default EditGame;
