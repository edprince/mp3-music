import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import * as Request from '../modules/request.js';

class Register extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  register() {
    //Get user details and make request
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //Make request with user details
    Request.register({email, password}).then(response => {
      console.log('User created: ', response.message);
      window.location.href = '/login';
    }).catch(err => {
      console.error('Error: ', err);
    });
  }

  render() {
    return (
      <div className='content'>
        <h1>Register</h1>
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
            <button id='register-btn' onClick={this.register} className="button is-primary">
              Register
            </button>
          </p>
          <p className='control'>
            <a className='button is-dark' id='login-btn' href='/login'>Back to Login</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
