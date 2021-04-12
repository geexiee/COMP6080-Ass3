import React from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EditGame from './pages/EditGame.jsx';
import EditQuestion from './pages/EditQuestion';
import Header from './components/Header.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/edit/:gid/:qid">
            <EditQuestion />
          </Route>
          <Route path="/edit/:gid">
            <EditGame />
          </Route>
          <Route path="/new">
            <NewQuiz />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const NewQuiz = () => {
  const [name, setName] = React.useState('');
  const addNew = async () => {
    const response = await axios.post('http://localhost:5005/admin/quiz/new', { name }, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).catch(e => console.log(e.response.data.error));
    if (response !== undefined && response.status === 200) {
      console.log('New quiz made :D');
    }
  }

  return (
    <div>
      <Header />
      <h2>New Quiz</h2>
      Name: <input onChange={e => setName(e.target.value)} value={name} type="text" />
      <button onClick={addNew}>Create</button>
    </div>
  );
}

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Route exact path="/">
        {localStorage.getItem('token') ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
      </Route>
    </div>
  );
}

export default App;
