import React, { Component } from 'react';
import LoginButton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import './Menu.css';

class Menu extends Component {
  render() {
    let button;
    document.addEventListener('DOMContentLoaded', () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll('.navbar-burger'),
        0
      );
      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {
            // Get the target from the "data-target" attribute
            const menu = document.getElementById('navbar');
            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            menu.classList.toggle('is-active');
          });
        });
      }
    });

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            Music
          </a>
          <button
            id="burger"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div id="navbar" className="navbar-menu">

          <div className="navbar-start" />

          <div className="navbar-end">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a id='create-btn' href="/create" className="navbar-item">
              Create Playlist
            </a>
            <div className="navbar-item">
              <div className="buttons">
                {localStorage.getItem('userId') ? <LogoutButton /> : <LoginButton />}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
