import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';
import FaGithubSquare from 'react-icons/lib/fa/github-square';


/*
 * The page header
 */
class Header extends Component {
  render() {
    return (
      <header>
        <a href="https://www.freecodecamp.com">
          <img className="fcclogo" src="https://www.freecodecamp.com/design-style-guide/img/freeCodeCamp.svg" alt="FreeCodeCamp logo" />
        </a>
      </header>
    );
  }
}

/*
 * The page footer
 */
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

/*
 *  Component for column headers including basic sort mechanism 
 */
class ColumnHeadings extends Component {
  render() {
    return (
      <thead>
      <tr id="colheaders" className="top100">
        <th style="text-align"className="idcol">#</th>
        <th>Camper Name</th> 
        <th id="defaultsort" className="sortable sorted true" onClick={this.handleClickNum.bind(this, "recent")}>Points in past 30 days</th>
        <th className="sortable" onClick={this.handleClickNum.bind(this, "alltime")}>All time points </th>
      </tr>
      </thead>
    );
  }
  removeSortClasses() {
    var nodes = document.getElementsByClassName('sortable');
    for (var i=0; i < nodes.length; i++) {
      nodes.item(i).className = "sortable";
    };
  }
  handleClickNum(fieldname, evt) {
    if (!evt.target.classList.contains('sorted')) {
      this.removeSortClasses();
      evt.target.className = 'sortable sorted true'; // true means descending
      this.props.sortTableNum(fieldname);    
    }
  } 
}

/*
 *  Component represents a user row in the table and a handler for user updates
 */
class User extends Component {
  render() {
    var showDate = moment(this.props.user.lastUpdate).format("YYYY-MM-DD HH:mm:ss");
    return (
      <tr className="top100">
        <td className="idcol">{this.props.count}</td>
        <td>
          <a href={"https://www.freecodecamp.com/"+this.props.user.username} target="_blank">
            <img src={this.props.user.img} className="userimg"/>
            <span>{this.props.user.username}</span>
          </a>
        </td>
        <td className="numbercol">{this.props.user.recent}</td>
        <td className="numbercol">{this.props.user.alltime}</td>
      </tr>
    );
  }
  handleClickUpdateUser() {
    $.get( this.props.apiroot+"update/"+this.props.user.username, 
          function( data ) {
            setTimeout(this.props.updatePage,3000);
          }.bind(this)
        )
    .fail(function() {
        console.error(this.props.apiroot, status, err.toString());
  });
  }
}

/*
 *  Component for  
 */
class Leaderboard extends Component {
  render() {
      var count = 0;
      var self = this;
      var userlist = this.props.users.map(function(user) {
         count++;
         return (
           <User user={user} key={user.username} count={count} apiroot={this.props.apiroot} updatePage={this.props.updatePage}/>
         );
      }.bind(this));

    return (
       <table className="table table-striped table-bordered">
          <ColumnHeadings sortTableNum={this.props.sortTableNum}/>
          <tbody>
            {userlist}
          </tbody>
      </table>
    );
  }
}

/* 
 * The page body, with state and status handlers for switching the mode (recent/all time) 
 * and handlers for sorting 
 */
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
      url: this.props.apiroot+"top/"+this.state.column,
      dataType: 'json', 
      cache: false,
      success: function(data) {
        var users = data;
        this.setState({users: users});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.apiroot, status, err.toString());
      }.bind(this)
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
                apiroot={this.props.apiroot} 
                updatePage={this.getData.bind(this)} 
                sortTableNum={this.sortTableNum.bind(this)} 
                />
           </div>
        </div>
      </div>
    );
  }
  removeSortClasses() {
    var nodes = document.getElementsByClassName('sortable');
    for (var i=0; i < nodes.length; i++) {
      nodes.item(i).className = "sortable";
    };
  }
  sortTableNum(column) {
     // only sort descending. After all it's a top100
     // Ignore click if the list was already sorted on that item
     if (column !== this.state.column) {
        this.setState({reverse: true, column: column},  this.getData);
     }
   }
}
  
/*
 * The application level component
 */
class Application extends Component {
  render() {
    return <div>
      <Header />
      <Body apiroot={this.props.apiroot} />
      <Footer />
    </div>;
  }
}

/* 
 * Put it all into the HTML
 */
render(<Application  apiroot="https://fcctop100.herokuapp.com/api/fccusers/"/>, document.getElementById('fcctop'));
