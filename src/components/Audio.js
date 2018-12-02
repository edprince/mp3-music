import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import Sound from 'react-sound';
import './Audio.css';
const TITLE_LENGTH = 15;


class Audio extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.url !== this.state.url) {
      this.onUrlChange();
    }
  }

  onUrlChange() {
    console.log('Reloading');
    this.refs.audio.load();
    this.refs.audio.play();
    //<Sound url={this.props.url} />
  }

  render() {
    return (
      <div>
        <div className='field is-grouped song'>
          <div className='control'>
            <p className='vertical-center'>{this.props.title.slice(0, TITLE_LENGTH)}</p>
          </div>
          <audio src={this.props.url} controls id='audio' ref='audio' />
        </div>
      </div>
    );
  }
}

export default Audio;
