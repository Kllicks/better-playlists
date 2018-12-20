import React, { Component } from 'react';
import './App.css';

class Filter extends Component {
	render() {
		return (
			<div>
                <p>Filter</p>
				<input type='text' onKeyUp={event => 
					this.props.onTextChange(event.target.value)}/>
			</div>
		);
	}
}

export default Filter;