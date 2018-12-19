import React, { Component } from 'react';
import './App.css';
import queryString from'query-string';

let fakeServerData = {
	user: {
		name: 'Kyle',
		playlists: [
			{
				name: 'My Favorites',
				songs: [
					{name: 'Drummer Boy', duration: 120} , 
					{name: 'Jingle Bells', duration: 240}, 
					{name: 'White Christmas', duration: 480}
				]
			},
			{
				name: 'Top',
				songs: [
					{name: 'Drummer Boy', duration: 120} , 
					{name: 'Jingle Bells', duration: 240}, 
					{name: 'White Christmas', duration: 480}
				]
			},
			{
				name: 'Workout',
				songs: [
					{name: 'Drummer Boy', duration: 120} , 
					{name: 'Jingle Bells', duration: 240}, 
					{name: 'White Christmas', duration: 480}
				]
			},
			{
				name: 'Party',
				songs: [
					{name: 'Drummer Boy', duration: 120} , 
					{name: 'Jingle Bells', duration: 240}, 
					{name: 'White Christmas', duration: 480}
				]
			}
		]
	}
};

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
				<img/>
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
				<img/>
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
		// let parsed = queryString.parse(window.location.search);
		// console.log(parsed);
		// let accessToken = parsed.access_token;
		// console.log(accessToken);

		// fetch('https://api.spotify.com/v1/me', {
		// 	headers : {'Authorization' : 'Bearer' + accessToken}
		// }).then(response => response.json())

		setTimeout(() => {
			this.setState({serverData : fakeServerData});
		}, 1000);
	}

	render() {
		let playlistToRender = this.state.serverData.user ? this.state.serverData.user.playlists.filter((playlist) => { 
			return playlist.name.toLowerCase().includes(
				this.state.filterString.toLowerCase())
		}) : []
		return (
			<div className="App">
				{this.state.serverData.user ? 
				<div>
					<h1>
						{this.state.serverData.user.name}'s Playlists
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
					<h1>Loading...</h1>
					// <button onClick={() => window.location = 'http://localhost:8888/login'}
					// style={{padding: '20px', 'fontSize': '50px'}}>Sign in with Spotify</button>
				}
			</div>
		);
	}
}

export default App;
