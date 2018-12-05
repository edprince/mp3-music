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
  /*
          <input className='button' type='file' id='mp3-file' name='file' />
          <input onClick={this.postSong} className='button is-primary' type='submit' name='submit' value='Add Song' />
          <form action="https://princee3-music.sfo2.digitaloceanspaces.com" method="post" enctype="multipart/form-data">
            Key to upload:
            <input className='input' type="input"  name="key" value="user/user1/${filename}" /><br />
            <input className='input' type="hidden" name="acl" value="public-read" />
            <input className='input' type="hidden" name="success_action_redirect" value="localhost:3000/" />

            Content-Type:
            <input className='input' type="input"  name="Content-Type" value="audio/mp3" /><br />
            <input className='input' type="hidden" name="x-amz-meta-uuid" value="14365123651274" />
            <input className='input' type="hidden" name="x-amz-server-side-encryption" value="AES256" />
            <input className='input' type="text"   name="X-Amz-Credential" value="AKIAIOSFODNN7EXAMPLE/20151229/us-east-1/s3/aws4_request" />
            <input className='input' type="text"   name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256" />
            <input className='input' type="text"   name="X-Amz-Date" value="20151229T000000Z" />

            Tags for File:
            <input className='input' type="input"  name="x-amz-meta-tag" value="" /><br />
            <input className='input' type="hidden" name="Policy" value='<Base64-encoded policy string>' />
            <input className='input' type="hidden" name="X-Amz-Signature" value="<signature-value>" />
            File:
            <input className='button' type="file"   name="file" /> <br />
            <input className='button is-primary' type="submit" name="submit" value="Add Song" />
          </form>
        */
};

export default Playlist;
