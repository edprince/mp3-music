import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import * as Request from '../modules/request.js';
import './MusicTile.css';

class CreatePlaylist extends Component {
  constructor(props) {
    super(props);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.state = {
      errors: []
    };
  }

  savePlaylist() {
    const title = document.getElementById('title').value;
    const photo = document.getElementById('photo').value;
    Request.savePlaylist({title, photo, public: 'true'}).then(response => {
      window.location.href='/';
    }).catch(err => {
      this.setState({errors: [{message: 'Login failed'}] });
    });
  }

  render() {
    return (
      <div className='content'>
        <h1>Create Playlist</h1>
        <div className='field'>
          <div className='control'>
            <input id='title' className='input' type='text' placeholder='Playlist Title'/>
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <input id='photo' className='input' type='text' placeholder='Photo URL'/>
          </div>
        </div>
        <div className="field is-grouped">
          <p className="control">
            <button id='save-btn' onClick={this.savePlaylist} className="button is-primary">
              Create Playlist
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default CreatePlaylist;
