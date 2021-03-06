import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import SignedInLinks from '../layouts/SignedInLinks'
import SignedOutLinks from '../layouts/SignedOutLinks'
import fire from '../../config/Fire';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
const styles = {

  };
class Dashboard extends Component {
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
        if (!auth.uid) return <Redirect to='/signin' /> 
        return (
            <div>
                <h1>Dashboard</h1>
                {links}
            </div>
        );

    }

}
const mapStateToProps = (state) => {
    // console.log(state);
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile
      //to get them ordered 
  
    }
  }
  Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  
export default connect(mapStateToProps)(withStyles(styles)(Dashboard));