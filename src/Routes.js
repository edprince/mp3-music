import React from 'react';
import Playlist from './components/Playlist.js';

export function PlaylistRoute({ match }) {
  const {id} = match.params;
  return <Playlist id={id} />;
}
