import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Header from './components/AuthHeader.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';

const App = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <Header />
        </nav> */}
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
