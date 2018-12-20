import React, { Component } from 'react';
import './App.css';
// import queryString from'query-string';

// let fakeServerData = {
// 	user: {
// 		name: 'Kyle',
// 		playlists: [
// 			{
// 				name: 'My Favorites',
// 				songs: [
// 					{name: 'Drummer Boy', duration: 120} , 
// 					{name: 'Jingle Bells', duration: 240}, 
// 					{name: 'White Christmas', duration: 480}
// 				]
// 			}
// 		]
// 	}
// };

class PlaylistCounter extends Component {
	render () {
		return (
			<div style={{width: '40%', display: 'inline-block'}}>
				<h2>{this.props.playlists.length} Playlists</h2>
			</div>
		);
	}
}

class HoursCounter extends Component {
	render () {
		let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
			return songs.concat(eachPlaylist.songs);
		}, []);
		let totalDuration = allSongs.reduce((sum, eachSong) => {
			return sum + eachSong.duration;
		}, 0);
		return (
			<div style={{width: '40%', display: 'inline-block'}}>
				<h2>{Math.round(totalDuration/60)} Hours</h2>
			</div>
		);
	}
}

class Filter extends Component {
	render() {
		return (
			<div>
				{/* <img/> */}
				<input type='text' onKeyUp={event => 
					this.props.onTextChange(event.target.value)}/>
			</div>
		);
	}
}

class Playlist extends Component {
	render() {
		let playlist = this.props.playlist;
		return(
			<div style={{width: '25%', display: 'inline-block'}}>
				<img src={playlist.imageUrl} alt='album cover' style={{width: '60px'}}/>
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
		// console.log(accessToken);

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
			.then(playlistData => {
				let playlists = playlistData.items;
				let trackDataPromises = playlists.map(playlist => {
					let responsePromise = fetch(playlist.tracks.href, {headers : {'Authorization': 'Bearer ' + accessToken}
					});
					let trackDataPromise = responsePromise
						.then(response => response.json())
					return trackDataPromise;
				})
				let allTrackDataPromises = Promise.all(trackDataPromises);
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
			.then(playlists => this.setState({
				playlists: playlists.map(item => {
					// console.log(item.trackDatas);
					return {
						name: item.name,
						imageUrl: item.images[0].url,
						songs: item.trackDatas.slice(0,3)
					}
			})
			}));

		// setTimeout(() => {
		// 	this.setState({serverData : fakeServerData});
		// }, 1000);
	}

	render() {
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
					// <h1>Loading...</h1>
					<button onClick={() => {
						window.location = window.location.href.includes('localhost')
						? 'http://localhost:8888/login'
						: 'https://www.spotify.com/'}
					}
					style={{padding: '20px', 'fontSize': '50px'}}>Sign in with Spotify</button>
				}
			</div>
		);
	}
}

export default App;
