import React from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';


class Register extends React.Component {
    constructor(props){
      super(props);
      this.state = {username: "", firstName: "", lastName: "", email: "", password: "", rePassword: "", forward: true};
  
      this.updateusername = this.updateusername.bind(this);
      this.updatefname = this.updatefname.bind(this);
      this.updatelname = this.updatelname.bind(this);
      this.updateemail = this.updateemail.bind(this);
      this.updatepass = this.updatepass.bind(this);
      this.updaterepass = this.updaterepass.bind(this);
      this.submit = this.submit.bind(this);
    }
  
    updateusername(e) {
      this.setState({username: e.target.value});
    }
  
    updatefname(e) {
      this.setState({firstName: e.target.value});
    }
  
    updatelname(e) {
      this.setState({lastName: e.target.value});
    }
  
    updateemail(e) {
      this.setState({email: e.target.value});
    }
  
    updatepass(e) {
      this.setState({password: e.target.value});
    }
  
    updaterepass(e) {
      this.setState({rePassword: e.target.value});
    }
  
    submit(event){
      const data = { username: this.state.username, first_name: this.state.firstName, last_name: this.state.lastName, email: this.state.email, password: this.state.password, password_confirm: this.state.rePassword };
  
      fetch('http://192.168.43.8:8080/accounts/register/', {
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
  
    render() {
      return (
        <div className="Register" style={{ position: "absolute",
        top: "10%",
        left: "35%",
        width: "500px"}}>
          <Card elevation={4}>
            <h2> Sign Up </h2>
            <TextField id="login" margin="normal" label="Username" variant="outlined" value={this.state.username} onChange={this.updateusername}/>
            <br/>
            <TextField id="firstName" margin="normal" label="First Name" variant="outlined" value={this.state.firstName} onChange={this.updatefname}/>
            <br/>
            <TextField id="lastName" margin="normal" label="Last Name" variant="outlined" value={this.state.lastName} onChange={this.updatelname}/>
            <br/>
            <TextField id="email" margin="normal" label="Email" variant="outlined" value={this.state.email} onChange={this.updateemail}/>
            <br/>
            <TextField id="password" margin="normal" label="password" type="password" variant="outlined" value={this.state.password} onChange={this.updatepass}/>
            <br/>
            <TextField id="password" margin="normal" label="Repeat password" type="password" variant="outlined" value={this.state.rePassword} onChange={this.updaterepass}/>
            <br/>
            <Button type="submit" color="primary" variant="outlined" onClick={this.submit}> Submit </Button>
            <Fab color="primary" disabled={this.state.forward}>
              <a href="/signin" ><ArrowForwardIosRoundedIcon /></a>
            </Fab>
            <br/>
            <br/>
          </Card>
        </div>
      );
    }
  }
  
  function App() {
    return (
      <div className="App">
        <Register/>
      </div>
    );
  }
  
  export default App;