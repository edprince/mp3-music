import React, { Component } from "react";
import "./LoginButton.css";

class LoginButton extends Component {
  render() {
    return (
      <a href="/login" className="button is-primary">
        <strong>Log In</strong>
      </a>
    );
  }
}

export default LoginButton;
