import React, { Component } from 'react';
import './App.css';
// import UserList from './containers/user-list'
import fire from './config/Fire';
import Home from '../src/components/layouts/Home'
import Login from '../src/components/auth/Login';
import Navigation from '../src/components/Navigation/Navigation';
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from '../src/components/auth/SignUp';
import Dashboard from '../src/components/layouts/Dashboard';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = theme => ({
 app: {
   backgroundImage: 'url(' + 'fabio-mangione.f26c34bb.jpg' + ')',
 }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
    // <Redirect to='home' />
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.setState({ user });
        //localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem('user');
      }
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    )
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);