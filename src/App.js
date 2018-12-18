import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
	user: {
		name: 'Kyle',
		playlists: [
			{
				name: 'My Favorites',
				songs: ['Beat It', 'Cannelloni Makaroni', 'Rosa helikopter']
			},
			{
				name: 'Discover Weekly',
				songs: ['Beat It', 'Cannelloni Makaroni', 'Rosa helikopter']
			},
			{
				name: 'Another Playlist - the best!',
				songs: ['Beat It', 'Cannelloni Makaroni', 'Rosa helikopter']
			},
			{
				name: 'Playlist - yeah!',
				songs: ['Beat It', 'Cannelloni Makaroni', 'Rosa helikopter']
			},
		]
	}
};

class Aggregate extends Component {
	render () {
		return (
			<div style={{width: '40%', display: 'inline-block'}}>
				<h2 style={{color: 'black'}}>{this.props.playlists && this.props.playlists.length} Text</h2>
			</div>
		);
	}
}

class Filter extends Component {
	render() {
		return (
			<div>
				<img></img>
				<input type='text'></input>
			</div>
		);
	}
}

class Playlist extends Component {
	render() {
		return(
			<div style={{width: '25%', display: 'inline-block'}}>
				<img></img>
				<h3>Playlist Name</h3>
				<ul>
					<li>Song 1</li>
					<li>Song 2</li>
					<li>Song 3</li>
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
				{this.state.serverData.user && 
				<h1>
					{this.state.serverData.user.name}'s Playlists
				</h1>
				}
				<Aggregate playlists={this.state.serverData.user && this.state.serverData.user.playlists}/>
				<Aggregate/>
				<Filter/>
				<Playlist/>
				<Playlist/>
				<Playlist/>
				<Playlist/>
			</div>
		);
	}
}

export default App;
