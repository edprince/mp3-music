import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import './MusicTile.css';

class MusicTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='card'>
        <a href='/playlist'>
          <div className='card-image'>
            <figure className='image is-4by4'>
              <img src='https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Led_Zeppelin_-_Mothership.jpg/220px-Led_Zeppelin_-_Mothership.jpg' alt='Placeholder image'/>
            </figure>
          </div>
          <div className='card-content'>
            <span className='has-text-weight-bold'>My Playlist Name</span>
            <p>14 Songs</p>
          </div>
        </a>
      </div>
    );
  }
}

export default MusicTile;
