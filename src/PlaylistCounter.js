import React, { Component } from 'react';
import './App.css';

class PlaylistCounter extends Component {
	render () {
		return (
			<div className='playlistCounter'>
				<h2>{this.props.playlists.length} Playlists</h2>
			</div>
		);
	}
}

export default PlaylistCounter;