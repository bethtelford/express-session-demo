import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      user: ''
    }
    this.login = this.login.bind(this);
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    // // This code is how you would implement a redirect based on if a user was logged in
    // // If you were using Redux, you would check to see if the user was on redux first (not aways relevant!), 
    // // and if they are not, you would check the backend to see if they have a session
    // if (!this.props.user) {
    //   axios.get('/api/me').then(res => {
    //     // If we find them on sessions, we want to put that information on Redux (if we're using that) so our front end can use it  
    //     this.props.updateUser(res)
    //   }).catch(err => {
    //     this.props.history.push('/login')
    //   })
    // } // Nothing happens if they ARE on Redux. Yay!
  }

  login() {
    axios.post('/api/login',
      { username: this.state.username, password: this.state.password })
      .then(res => {
        console.log('logged in')
      })
  }
  getUser() {
    axios.get('/api/me')
      .then(res => {
        this.setState({
          user: res.data
        })
      })
      .catch(err => {
        this.setState({
          user: 'There is no user logged in'
        })
      })
  }
  logout() {
    axios.delete('/api/logout')
      .then(res => {
        console.log('logged out')
      })
  }

  render() {
    return (
      <div className="App">
        <input onChange={e => this.setState({ username: e.target.value })} value={this.state.username} />
        <input onChange={e => this.setState({ password: e.target.value })} value={this.state.password} />
        <button onClick={this.login}>Login</button>

        <div>{this.state.user}</div>
        <button onClick={this.getUser}>Get User</button>

        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default App;
