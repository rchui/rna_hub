import React, {Component} from 'react';
//import ReactRouter, {IndexRoute} from 'react-router';
import { BrowserRouter as Router, Route, IndexRoute, Link} from "react-router-dom";
import App from '../components/App.jsx';
import Main from '../components/Main.jsx';
import Overview from '../components/Overview';
import Search from '../components/Search';
import Insert from '../components/Insert';

export default class Routes extends Component {
	render() {
		return (
			<Router>

				<div className = "RouterDiv">
				  {/*<ul>
			      <li><Link to="/">Home</Link></li>
			      <li><Link to="/search">Search By Text</Link></li>
			      <li><Link to="/insert">Insert</Link></li>
			    </ul>
			    */}
			    <Main />
			    <div class="container is-fluid">
				    {/* Both components below would be rendered when in a homepage*/}
				    <Route exact path='/' component = {Overview} />

				    <Route path='/search' component={Search} />
				    <Route path='/insert' component={Insert} />
				     {/* <Route path='pub-search' component={Publication}/>
				      <Route path='align' component={Align} /> */}
			     </div>
			    <footer class="footer">
					  <div class="container">
					    <div class="content has-text-centered">
					      <p>
					        <strong>RNAHub</strong> by <a href="www.google.com">Team NCSA1</a>
					        <br/>
					        Copyright © 2017 NCSA
					      </p>
					    </div>
					  </div>
					</footer>
		    </div>

		  </Router>
		);
	}
}

