import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './users/Users';
import User from './users/User';
import axios from 'axios';
import Search from './users/Search';
import Alert from './components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import  About  from './components/pages/About';


class App extends Component {
  state = {
    users: [],
    repos: [],
    user:{},
    loading: false,
    alert: null
  }
  // async componentDidMount(){
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   this.setState({loading:true});
  //   const res= await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   this.setState({users:res.data, loading:false});
  // }
  searchUsers = async (text) => {
    console.log(text);
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, loading: false });
  }
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data);
    this.setState({ user: res.data, loading: false });
  }
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data);
    this.setState({ repos: res.data, loading: false });
  }
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  }
  setAlert = (msg,type) => {
    this.setState({alert:{msg:msg,type:type}});
    setTimeout(()=>this.setState({alert:null}),5000)
  }
  render() {
    const { user, users, loading, repos } = this.state;
    return (
      <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route path="/" exact render={props=>(
              <Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route exact path="/user/:login" render={props=>(
              <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading}/>
            )}></Route>
          </Switch>
        </div>

      </div>
      </Router>
    );
  }
}

export default App;
