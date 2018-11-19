import React, { Component } from 'react'; //eslint-disable-line no-unused-vars

class Register extends Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
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
        <div className='field'>
          <div className='control'>
            <input className='input' type='password' placeholder='Re-type Password'/>
          </div>
        </div>
        <div className="field is-grouped">
          <p className="control">
            <button className="button is-primary">
              Register
            </button>
          </p>
          <p className='control'>
            <a className='button is-dark' href='/login'>Back to Login</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
