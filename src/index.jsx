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
			success: function(data) {
				var users = data;
				this.setState({users: users});
			}.bind(this),
		});
	}
	componentDidMount() {
		this.getData();
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div id="header">
							<h3>Leaderboard</h3>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<Leaderboard 
							users={this.state.users}
							apiroot={this.props/apiroot}
							updatePage={this.getData.bind(this)}
							sortTableNum={this.sortTableNum.bind(this)}
						/>
					</div>
				</div>
			</div>
		);
	}
	removeSortClasses() {
		var nodes = document.getElementByClassName('sortable');

		for (var i=0; i<nodes.length; i++) {
			nodes.item(i).className = "sortable";
		};
	}
	sortTableNum(column) {
		if (column !== this.state.column) {
			this.setState({reverse: true, column: column}, this.getData);
		}
	}
}

class Application extends Component {
	render() {
		return <div>
			<Header />
			<Body apiroot={this.props.apiroot} />
			<Footer />
			</div>;
	}
}


render(<Application />, document.getElementById('fcctop'));