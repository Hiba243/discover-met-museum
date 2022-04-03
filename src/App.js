import React,{useEffect} from 'react';
import './App.css';
import { AnimatedSwitch } from 'react-router-transition';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './components/pages/About';
import ArtState from './context/metart/ArtState';
import NotFound from './components/pages/NotFound';
import Display from './components/Art/Display';
import LandingPage from './components/pages/LandingPage';
const App = () => {
  useEffect(()=>{
    return () => {
    localStorage.removeItem('objId');
    localStorage.removeItem('deptName');
    }
  },[])
  return (
    <ArtState>
      <Router>
        <div className="App">
          <div className="container">
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
              className="switch-wrapper"
            >
              <Route path="/" exact component={LandingPage}></Route>
              <Route exact path="/choosedept" component={Home}></Route>
              <Route exact path="/about" component={About}></Route>
              <Route exact path="/search" component={Display}></Route>
              <Route component={NotFound}></Route>
            </AnimatedSwitch>
          </div>
        </div>
      </Router>
    </ArtState>
  );

}

export default App;
