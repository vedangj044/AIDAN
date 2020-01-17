import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const useStyles = makeStyles(theme => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));


  // const classes = useStyles();
  class Signin extends React.Component{
    constructor(props){
      super(props);
      this.state = {login: "", password: "", forward: true};
  
      this.updatelogin = this.updatelogin.bind(this);
      this.updatepass = this.updatepass.bind(this);
      this.submit = this.submit.bind(this);
    }
  
    updatelogin(e) {
      this.setState({login: e.target.value});
    }
  
    updatepass(e) {
      this.setState({password: e.target.value});
    }
  
    submit(event){
      const data = { login: this.state.login, password: this.state.password };
  
      fetch('http://localhost:8080/accounts/login/', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.setState({forward: false});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    render(){
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: "40px"}}>
        <Avatar style={{margin:"20px"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form  style={{width: '100%', marginTop: "50px"}} noValidate >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.login} onChange={this.updatelogin}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password} onChange={this.updatepass}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:"30px", marginBottom:"30px"}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
  }

  export default Signin;