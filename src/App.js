import React, { Component } from 'react';
import './App.css';
import Playlist from './Playlist';
import Filter from './Filter';
import HoursCounter from './HoursCounter';
import PlaylistCounter from './PlaylistCounter';

class App extends Component {
	constructor() {
		super();
		this.state = {
			serverData: {},
			filterString: ''
		}
	}

	componentDidMount() {
		//save access token + refresh token
		let hash = window.location.hash.substr(1);
		let arHash = hash.split('access_token=');
		let accessToken = arHash[1];

		if (!accessToken)
			return;
		
		//fetch current user
		fetch('https://api.spotify.com/v1/me', {headers : {'Authorization': 'Bearer ' + accessToken}})
			.then(response => response.json())
			.then(data => this.setState({
				user: {
					name: data.display_name
				}
			}));
		
		// fetch playlist of current user
		fetch('https://api.spotify.com/v1/me/playlists', {headers : {'Authorization': 'Bearer ' + accessToken}})
			.then(response => response.json())
			// Get playlist info
			.then(playlistData => {
				let playlists = playlistData.items;
				let trackDataPromises = playlists.map(playlist => {
					// Also grab playlist image
					let responsePromise = fetch(playlist.tracks.href, {headers : {'Authorization': 'Bearer ' + accessToken}
					});
					let trackDataPromise = responsePromise
						.then(response => response.json())
					return trackDataPromise;
				})
				let allTrackDataPromises = Promise.all(trackDataPromises);
				// Grab all the songs and their durations
				let playlistsPromise = allTrackDataPromises
					.then(trackDatas => {
						trackDatas.forEach((trackData, i) => {
							playlists[i].trackDatas = trackData.items
							.map(item => item.track)
							.map(trackData => ({
								name: trackData.name,
								duration: trackData.duration_ms / 1000
							}))
						})
						return playlists;
					})
					return playlistsPromise;
			})
			// set state with playlists, image, and the first 3 songs
			.then(playlists => this.setState({
				playlists: playlists.map(item => {
					return {
						name: item.name,
						imageUrl: item.images[0].url,
						songs: item.trackDatas.slice(0,3)
					}
			})
			}));
	}

	render() {
		// if a user exists and has playlists match playlists and songs to the filterString
		let playlistToRender = 
			this.state.user && 
			this.state.playlists 
			? this.state.playlists.filter((playlist) => {
				let matchesPlaylist = playlist.name.toLowerCase().includes(
					this.state.filterString.toLowerCase());
				let matchesSong = playlist.songs.find(song => song.name.toLowerCase().includes(
					this.state.filterString.toLowerCase()))
				return matchesPlaylist || matchesSong;
		}) : [];
		return (
			<div className="App">
				{this.state.user ? 
				<div>
					<h1>
						{this.state.user.name}'s Playlists
					</h1>
					<PlaylistCounter playlists={playlistToRender}/>
					<HoursCounter playlists={playlistToRender}/>
					<Filter onTextChange={text => this.setState({filterString: text})}/>
					{
						playlistToRender.map((playlist) => {
							return <Playlist playlist={playlist}/>
						})
					}
				</div> : 
					<button onClick={() => {
						window.location = window.location.href.includes('localhost')
						? 'http://localhost:8888/login'
						: 'https://www.spotify.com/'}
					}
					className='OathButton'>Sign in with Spotify</button>
				}
			</div>
		);
	}
}

export default App;
