import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import './MusicTile.css';

class MusicTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='card'>
        <a href={'/playlist/' + this.props.id}>
          <div className='card-image'>
            <figure className='image is-4by4'>
              <img src={this.props.photo} alt='Placeholder image'/>
            </figure>
          </div>
          <div className='card-content'>
            <span className='has-text-weight-bold'>{this.props.title}</span>
          </div>
        </a>
      </div>
    );
  }
}

export default MusicTile;
