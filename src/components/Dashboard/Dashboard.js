import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
class Dashboard extends Component {

    render() {
        const {auth} = this.props;
        if (!auth.uid) return <Redirect to='/signin' /> 
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        );

    }

}
const mapStateToProps = (state) => {
    // console.log(state);
    return {
      auth: state.firebase.auth,
      //to get them ordered 
  
    }
  }
export default connect(mapStateToProps)(Dashboard);