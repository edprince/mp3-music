import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import * as Request from '../modules/request.js';
import './Playlist.css';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.state = {
      playlist: {},
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
      <div className='content'>
        <h1>{this.state.playlist.title}</h1>
        <img src={this.state.playlist.photo} />
        <p>{this.state.playlist.songs ? this.state.playlist.songs.length : 0} songs</p>
        <button className='button is-primary'>Add Song</button>
      </div>
    );
  }
}

export default Playlist;
