import React from 'react';
import Header from '../components/Header.jsx';
import axios from 'axios';
import ReactDOM from 'react-dom';

const Dashboard = () => {
  const GetQuizzes = async () => {
    const response = await axios.get('http://localhost:5005/admin/quiz', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log(response.data.quizzes);
      // const anchor = document.getElementById('quiz');
      (response.data.quizzes).forEach(quiz => {
        console.log(quiz.id);
        <div key={quiz.id}>{quiz.id}</div>
        const tile = React.createElement('Card', { style: { className: 'card' } }, quiz.id);
        const container = React.createElement('div', { style: { backgroundColor: 'yellow' } }, tile);
        // anchor.appendChild(tile);
        // want to find a way to append all existing quizzes on diff cards
        // this currently will replace whatever was previously there
        ReactDOM.render(container, document.getElementById('quiz'));
      })
    }
  }

  return (
    <div>
      <Header />
      <h2>Dashboard</h2>
      <button onClick={GetQuizzes} >Make this show up w/o button</button>
      <div id="quiz"></div>
    </div>
  );
}

export default Dashboard;
