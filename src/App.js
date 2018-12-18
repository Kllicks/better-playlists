import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
	user: {
		name: 'Kyle',
		playlists: [
			{
				name: 'My Favorites',
				songs: [
					{name: 'Beat It', duration: 1345} , 
					{name: 'Cannelloni Makaroni', duration: 1236}, 
					{name: 'Rosa helikopter', duration: 70000}
				]
			},
			{
				name: 'Discover Weekly',
				songs: [
					{name: 'Beat It', duration: 1345} , 
					{name: 'Cannelloni Makaroni', duration: 1236}, 
					{name: 'Rosa helikopter', duration: 70000}
				]
			},
			{
				name: 'Another Playlist - the best!',
				songs: [
					{name: 'Beat It', duration: 1345} , 
					{name: 'Cannelloni Makaroni', duration: 1236}, 
					{name: 'Rosa helikopter', duration: 70000}
				]
			},
			{
				name: 'Playlist - yeah!',
				songs: [
					{name: 'Beat It', duration: 1345} , 
					{name: 'Cannelloni Makaroni', duration: 1236}, 
					{name: 'Rosa helikopter', duration: 70000}
				]
			},
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
				<input type='text'></input>
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
			serverData: {}
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				serverData: fakeServerData
			});
		}, 1000);
	}

	render() {
		return (
			<div className="App">
				{this.state.serverData.user ? 
				<div>
					<h1>
						{this.state.serverData.user.name}'s Playlists
					</h1>
					<PlaylistCounter playlists={this.state.serverData.user.playlists}/>
					<HoursCounter playlists={this.state.serverData.user.playlists}/>
					<Filter/>
					{this.state.serverData.user.playlists.map((playlist) => {
							return <Playlist playlist={playlist}/>
						})
					}
				</div> : <h1>Loading...</h1>
				}
			</div>
		);
	}
}

export default App;
