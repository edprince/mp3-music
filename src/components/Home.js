import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import CreateTile from './CreateTile.js';
import MusicTile from './MusicTile.js';
import ErrorMessage from './ErrorMessage.js';
import * as Request from '../modules/request.js';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      errors: []
    };
    this.requestPlaylists = this.requestPlaylists.bind(this);
    this.requestPlaylists();
  }

  requestPlaylists() {
    Request.getPlaylists().then(response => {
      this.setState({playlists: response.data.response});
      console.log(this.state.playlists);
      console.log(this.state.errors);
    }).catch(err => {
      this.setState({errors: [...this.state.errors, {message: err}]});
    });
  }

  render() {
    return (
      <div className='wide-content'>
        <div className='content'>
          <h1>Home</h1>
        </div>
        {this.state.errors.map(error =>
          <ErrorMessage error={error.message} />
        )}
        <div className='columns is-multiline is-mobile'>
          {this.state.playlists.map(playlist =>
            <div className='column is-3-tablet is-2-desktop is-6-mobile'>
              <MusicTile title={playlist.title} photo={playlist.photo} />
            </div>
          )}
          <div className='column is-3-tablet is-2-desktop is-6-mobile'>
            <CreateTile />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
