import React from 'react';
import './assets/css/App.css';

//I initially made it a functional component, but it seems for now it's 
//impossible to use with enzyme's shallowWrapper::state. This is because 
//functional components don't actually have a state.
 
export default class App extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      result: null,
      loading: false,
      username: '',
      password: ''
    };
  }
 
  // button click action
  handleLogin = () => {
    //validation first, I would normally do a more complex validation function and import as a module
    if(this.state.username === '' || this.state.password === '') {
      this.setState({result: {success: false, message: "Please provide your password and username"}});
      return;
    }
    const apiUrl = "https://5fc00fbffd14be0016749759.mockapi.io/api/users";
    fetch(apiUrl,{
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({username: this.state.username,password: this.state.password})
    })
    .then(result => result.json())
    .then(json => {
      this.setState({result:json});
      console.log(json);
    })
  }

  //handle password field
  handlePasswordChange = e => {
    this.setState({password: e.target.value});
  }

  //handle username field
  handleUsernameChange = e => {
    this.setState({username: e.target.value});
  }
 
  render(){
    return (
      <div className="App">
        Login<br /><br />
        <div>
          Username<br />
          <input onChange={this.handleUsernameChange} id="username" type="text" value={this.state.username} />
        </div>
        <div style={{ marginTop: 10 }}>
          Password<br />
          <input onChange={this.handlePasswordChange} id="password" type="password" value={this.state.password} />
        </div>
        <button onClick={this.handleLogin} disabled={this.state.loading}>{this.state.loading ? 'Loading...' : 'Login'}</button><br />
        {this.state.result && <p><small style={{ color: this.state.result.success ? 'green' : 'red' }}>{this.state.result.message}</small><br /></p>}
      </div>
    );
  }
}