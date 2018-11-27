import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import * as Request from '../modules/request.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginRequest = this.loginRequest.bind(this);
  }

  loginRequest() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    Request.login({email, password}).then(response => {
      console.log('Logged in');
      window.location.href='/';
    }).catch(err => {
      console.log('Error logging in: ', err);
    });
  }

  render() {
    return (
      <div className='content'>
        <h1>Login</h1>
        <div className='field'>
          <div className='control'>
            <input id='email' className='input' type='email' placeholder='Email'/>
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <input id='password' className='input' type='password' placeholder='Password'/>
          </div>
        </div>
        <div className="field is-grouped">
          <p className="control">
            <button id='login-btn' onClick={this.loginRequest} className="button is-primary">
              Login
            </button>
          </p>
          <p className="control">or</p>
          <p className="control">
            <a href="/register" id="register-btn" className="button is-dark">
              Register
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
