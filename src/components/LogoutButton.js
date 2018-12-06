import React, { Component } from 'react';
import './LogoutButton.css';

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    localStorage.removeItem('userId');
  }

  render() {
    return (
      <a href="/login" onClick={this.handleClick} className="button is-primary">
        <strong>Log Out</strong>
      </a>
    );
  }
}

export default LogoutButton;
