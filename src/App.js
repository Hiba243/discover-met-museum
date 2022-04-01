import React, { useContext, useEffect } from 'react';
import './App.css';

import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './components/pages/About';
import ArtState from './context/metart/ArtState';
import AlertState from './context/alert/AlertState';
import NotFound from './components/pages/NotFound';
import Display from './components/Art/Display';
import LandingPage from './components/pages/LandingPage';
const App = () => {
  return (
    <ArtState>
      <AlertState>
        <Router>
          <div className="App">
            
            <div className="container">
              <Alert />
              <Switch>
                <Route path="/" exact component={LandingPage}></Route>
                <Route exact path="/choosedept" component={Home}></Route>
                <Route exact path="/about" component={About}></Route>
                <Route exact path="/search" component={Display}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </ArtState>
  );

}

export default App;
