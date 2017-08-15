import React, { Component } from 'react';
import { render } from 'react-dom';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';
import FaGithubSquare from 'react-icons/lib/fa/github-square';

class Header extends Component {
	render(){
		return (
			<header>
				<a href="https://www.freecodecamp.com">
					<img className="fcclogo" src="https://www.freecodecamp.com/design-style-guide/img/freeCodeCamp.svg" alt="freecodecamp logo" />
				</a>
			</header>	
		);
	}
}
class Footer extends Component {
	render() {
		return (
		<footer>
			<div className="container">
				<p>By Nilay Shrarma  <a href="https://www.facebook.com/nilay.sharma.31"><FaFacebookSquare /><FaGithubSquare /></a></p>
			</div>
		</footer>
		);
	}
}

class Body extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			reverse: true,
			column: "recent"
		}
	}
	getData() {
		$.ajax({
			url: this.props.aiproot+"top/"+this.state.column,
			dataType: 'json',
			cache: false,
			su
		})
	}
}

class Application extends Component {
	render() {
		return <div>
			<Header />
			<Footer />
			</div>;
	}
}


render(<Application />, document.getElementById('fcctop'));