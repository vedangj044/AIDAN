import React from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Cookies from 'universal-cookie';

class LoginForm extends React.Component {
  
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
    const cookies = new Cookies();
    const data = { login: this.state.login, password: this.state.password };

    fetch('http://192.168.1.21:8080/accounts/login/', {
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
      
      cookies.set('userId', data.detail, { path: '/' });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  
  render() {

    return (
      <div className="LoginForm" style={{ position: "absolute",
        top: "10%",
        left: "30%",
        width: "500px"}}>
        <Card elevation={4}>
          <h2> Login </h2>
          <TextField id="login" margin="normal" label="name" variant="outlined" value={this.state.login} onChange={this.updatelogin}/>
          <br/>
          <TextField id="password" margin="normal" label="password" type="password" variant="outlined" value={this.state.password} onChange={this.updatepass}/>
          <br/>
          <Button type="submit" color="primary" variant="outlined" onClick={this.submit}> Submit </Button>
          <Fab color="primary" href="/"disabled={this.state.forward}>
            <a href="/" ><ArrowForwardIosRoundedIcon style={this.state.forward?{color:"primary"}:{color:"white"}}/></a>
          </Fab>
          <br/>
          <a href="/admin"><h4 color="primary"> Register </h4></a>
          <br/>
        </Card>
      </div>
    );
  }
}


function App() {
  return (
    <div className="App">
      <LoginForm/>
    </div>
  );
}

export default App;
