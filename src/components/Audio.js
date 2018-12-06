import React, { Component } from 'react'; //eslint-disable-line no-unused-vars
import './Audio.css';
const url = 'https://princee3-music.sfo2.digitaloceanspaces.com/';
const TITLE_LENGTH = 15;


class Audio extends Component {
  constructor(props) {
    super(props);
    //this.props.url = urlArr[urlArr.length - 1];
  }
  //sfo2.digitaloceanspaces.com/princee3-music/Deadmau5_-_gg-JAB1rxKlTcU.mp3'
  /*

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
  */

  render() {
    const urlArr = this.props.url.split('/');
    const extension = urlArr[urlArr.length - 1];
    return (
      <div>
        <div className='field is-grouped song'>
          <div className='control'>
            <p className='vertical-center'>{this.props.title.slice(0, TITLE_LENGTH)}</p>
          </div>
          <audio src={url + extension} controls id='audio' ref='audio' />
        </div>
      </div>
    );
  }
}

export default Audio;
