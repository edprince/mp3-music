import React, { Component } from 'react'; //eslint-disable-line no-unused-vars

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className='field'>
          <div className='control'>
            <input className='input' type='email' placeholder='Email'/>
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <input className='input' type='password' placeholder='Password'/>
          </div>
        </div>
        <div className="field is-grouped">
          <p className="control">
            <button className="button is-primary">
              Login
            </button>
          </p>
          <p className="control">or</p>
          <p className="control">
            <a href='/register' className="button is-dark">
              Register
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
