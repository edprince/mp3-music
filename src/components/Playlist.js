import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import Audio from './Audio.js';
import * as Request from '../modules/request.js';
import 'filepond/dist/filepond.min.css';
import './Playlist.css';


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.postSong = this.postSong.bind(this);
    this.state = {
      playlist: {songs: []},
      errors: []
    };
    this.getPlaylist(this.props.id);
  }

  getPlaylist(id) {
    Request.getPlaylist(id).then(response => {
      const playlist = response.data[0];
      this.setState({playlist: playlist});
    }).catch(err => {
      this.setState({errors: [{message: err.message}]});
    });
  }

  postSong() {
    const songFile = document.getElementById('mp3-file').files[0];
    Request.postSong(songFile, this.props.id).then(response => {
      console.log(response);
      window.location.href='/';
    }).catch(err => {
      this.setState({errors: [{message: err.message}]});
    });
  }

  render() {
    return (
      <div>
        <div className='content'>
          <h1>{this.state.playlist.title}</h1>
          <p>{this.state.playlist.songs ? this.state.playlist.songs.length : 0} songs</p>
          <img src={this.state.playlist.photo} />
          <div className="file is-primary">
            <label className="file-label">
              <input className="file-input" onChange={this.postSong} type="file" name="resume" id='mp3-file' />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fa fa-upload"></i>
                </span>
                <span className="file-label">
                  Add a song...
                </span>
              </span>
            </label>
          </div>
        </div>
        <div className='wide-content'>
          <div className='songlist content-wide'>
            {this.state.playlist.songs.map((song) =>
              <Audio title={song.split('.')[0]} url={song} />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Playlist;
