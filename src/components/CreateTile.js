import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import './CreateTile.css';

class CreateTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='card'>
        <div className='card-content'>
          <i className='fa fa-plus-circle large'></i>
          <p className='center'>Create Playlist</p>
        </div>
      </div>
    );
  }
}

export default CreateTile;
