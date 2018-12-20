import React, { Component } from 'react';
import './App.css';

class HoursCounter extends Component {
	render () {
		let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
			return songs.concat(eachPlaylist.songs);
		}, []);
		let totalDuration = allSongs.reduce((sum, eachSong) => {
			return sum + eachSong.duration;
		}, 0);
		return (
			<div className='hoursCounter'>
				<h2>{Math.round(totalDuration/60)} Minutes</h2>
			</div>
		);
	}
}

export default HoursCounter;