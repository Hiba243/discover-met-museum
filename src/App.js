import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import User from './users/User';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import NotFound from './components/pages/NotFound';

const App = () => {
  // async componentDidMount(){
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   this.setState({loading:true});
  //   const res= await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   this.setState({users:res.data, loading:false});
  // }
  
  
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
              <Route exact path="/user/:login" component={User}></Route>
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
