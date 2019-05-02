import React, { Component } from 'react';
import fire from '../../config/Fire';
import '../auth/css/Login.css'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import Home from './Home';
// import Login from './Login'
import { Redirect } from "react-router-dom";
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: 'black',
    color: 'white'
  },
  root: {
    height : 'auto',
    padding: '0px',
    margin: '0px',
  }
});
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);

    this.state = {
      first: '',
      last: '',
      email: '',
      password: '',
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).then((u) => { this.props.history.push("/signout") })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <center>
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
               Sign Up
        </Typography>
              <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="first">First Name</InputLabel>
                  <Input id="first" name="first" value={this.state.first} onChange={this.handleChange} type="text" autoComplete="first" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="last">Last Name</InputLabel>
                  <Input id="last" name="last" value={this.state.last} onChange={this.handleChange} type="text" autoComplete="last" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" value={this.state.email} onChange={this.handleChange} type="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" value={this.state.password} value={this.state.password} onChange={this.handleChange} type="password" id="password" autoComplete="current-password" />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  type="submit" 
                  onClick={this.signup}
                  className={classes.submit}
                >
                 Sign Up
          </Button>
              </form>
            </Paper>
          </main>
        </center>
      </div>
      //       <div id="form">
      //       <h1 id="login">Login</h1>
      //       <center>
      //       <Form horizontal>
      //       <FormGroup htmlFor="exampleInputEmail1">
      //       <Col sm={6} md={4}>
      //       <FormControl value={this.state.first} onChange={this.handleChange} type="email" name="first" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your First name here" />
      //       </Col>
      //       </FormGroup>
      //       <Col sm={6} md={4}>
      //       <FormControl value={this.state.last} onChange={this.handleChange} type="email" name="last" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Last nnam here" />
      //       </Col>
      //       <Col idComponentClass={ControlLabel} md={2} sm={2}>
      //       Email address
      //       </Col>
      //       <Col sm={6} md={4}>
      //       <FormControl value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
      //       <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      //       </Col>
      //       <FormGroup htmlFor="exampleInputPassword1">
      //       <Col idComponentClass={ControlLabel} md={2} sm={2}>
      //       Password
      //       </Col>
      //       <Col sm={6} md={4}>
      //       <FormControl value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
      //       </Col>
      //       </FormGroup>
      //       <Col lg={8}>
      //       <Button onClick={this.signup} style={{marginLeft: '25px'}}>Signup</Button>
      //       </Col>
      //  </Form>
      //  </center>
      //  </div>
    );
  }
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SignUp);
