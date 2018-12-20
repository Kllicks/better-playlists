import React, { Component } from 'react';
import './App.css';

class Playlist extends Component {
    render() {
		let playlist = this.props.playlist;
		return(
			<div className='playlist'>
				<img src={playlist.imageUrl} alt='album cover' className='albumCover'/>
				<h3>{playlist.name}</h3>
				<ul>
					{
						playlist.songs.map((song) => {
							return <li>{song.name}</li>
						})
					}
				</ul>
			</div>
		);
	}
}

export default Playlist;