import React, { Component } from 'react';
import './Navigation.css'
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
import { Link } from 'react-router-dom'
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
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link to='/' className={classes.link}>
                STATISTICS
              </Link>
            </Typography>
            {this.state.user ?
              <MenuItem > <Link to='/dashboard' onClick={this.logout} className={classes.link}>Sign Out</Link></MenuItem>
              : (
                <span>
                    <Link to='/login' className={classes.link}>Login</Link>
                    <Link to='/signup' className={classes.link}>Sign Up</Link>
                </span>)}
          </Toolbar>
        </AppBar>
      </div >
        );
  }
}
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);