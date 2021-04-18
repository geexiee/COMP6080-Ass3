import React from 'react';
import './App.css';
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
import JoinGame from './pages/JoinGame.jsx';
import NewGame from './pages/NewGame.jsx';
import GameResult from './pages/GameResult';
import AddQuestion from './pages/AddQuestion.jsx';

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
            <NewGame />
          </Route>
          <Route path="/join/:sid">
            <JoinGame />
          </Route>
          <Route path="/join">
            <JoinGame />
          </Route>
          <Route path="/results/:sid">
            <GameResult />
          <Route path="/add/:gid/">
            <AddQuestion />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
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
