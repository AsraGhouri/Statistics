import React, { Component } from 'react';
import './Navigation.css'
import { Link } from 'react-router-dom'
import SignedInLinks from '../layouts/SignedInLinks'
import SignedOutLinks from '../layouts/SignedOutLinks'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import fire from '../../config/Fire';
import { connect } from 'react-redux'
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appbar: {
    backgroundColor: '#212121',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    margin: '10px'
  }
};
class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    };
    this.authListener = this.authListener.bind(this);
    this.logout = this.logout.bind(this);
  }
  logout() {
    fire.auth().signOut();
    // this.props.history.push("/");
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
    const { auth, profile } = this.props;
    // console.log(auth);
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Link to='/' className="brand-logo">Speed Up</Link>
            </Typography>
            {links}
          </Toolbar>
        </AppBar>
      </div >
        );
  }
}
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Navigation));