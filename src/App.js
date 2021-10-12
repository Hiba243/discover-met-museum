import React, { useContext, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';

import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './components/pages/About';
import GithubState from './context/metart/ArtState';
import AlertState from './context/alert/AlertState';
import NotFound from './components/pages/NotFound';
import Display from './components/Art/Display';
const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/search" component={Display}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );

}

export default App;
