import React, { Component } from 'react';
import './App.css';
import fire from './config/Fire';
import SignIn from '../src/components/auth/Login'
// import Navigation from '../src/components/Navigation/Navigation';
import { BrowserRouter , Switch, Route} from 'react-router-dom'
import SignUp from '../src/components/auth/SignUp';
import Dashboard from '../src/components/Dashboard/Dashboard';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
const styles = theme => ({
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
      <BrowserRouter>
      <div className="App">
        {/* <Navigation /> */}
        <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
          </Switch>
      </div>
    </BrowserRouter>
    )
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);