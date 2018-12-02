import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import Audio from './Audio.js';
import * as Request from '../modules/request.js';
import 'filepond/dist/filepond.min.css';
import './Playlist.css';
const space = 'https://princee3-music.sfo2.digitaloceanspaces.com/';


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.getPlaylist = this.getPlaylist.bind(this);
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


  render() {
    return (
      <div>
        <div className='content'>
          <h1>{this.state.playlist.title}</h1>
          <p>{this.state.playlist.songs ? this.state.playlist.songs.length : 0} songs</p>
          <img src={this.state.playlist.photo} />
        </div>
        <div className='wide-content'>
          <div className='songlist content-wide'>
            {this.state.playlist.songs.map((song) =>
              <Audio title={song.split('.')[0]} url={space + song} />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Playlist;
