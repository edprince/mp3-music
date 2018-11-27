import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import CreateTile from './CreateTile.js';
import MusicTile from './MusicTile.js';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className='wide-content'>
        <div className='content'>
          <h1>Home</h1>
        </div>
        <div className='columns'>
          <div className='column is-2'>
            <MusicTile />
          </div>
          <div className='column is-2'>
            <MusicTile />
          </div>
          <div className='column is-2'>
            <MusicTile />
          </div>
          <div className='column is-2'>
            <CreateTile />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
