import React, {Component} from 'react';
import '../stylesheets/App.css'
//import ReactRouter, {IndexRoute} from 'react-router';
import { BrowserRouter as Router, Route, IndexRoute, Link} from "react-router-dom";
import Main from '../components/Main.jsx';
import Overview from '../components/Overview';
import Search from '../components/Search';
import Result from '../components/Result';
import SeqSearch from '../components/SequenceSearch';
import Align from '../components/Alignment';
import Example from '../components/Example';
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
			    <div className="container is-fluid">
				    {/* Both components below would be rendered when in a homepage*/}
				    <Route exact path='/' component = {Overview} />
				    <Route path='/search' component={Search} />
				    <Route path='/result/:gg_id' component={Result} />
				    <Route path='/seqsearch' component={SeqSearch} />
				    <Route path='/align' component={Align} />
				    <Route path='/examples' component={Example} />
					<Route path='/insert' component={Insert}/>
			     </div>
			    <footer className="footer">
					  <div className="container">
					    <div className="content has-text-centered">
					      <p>
					        <strong>RNAHub</strong> by <a href="https://wiki.ncsa.illinois.edu/display/LH/HPC+for+Computational+Genomics">Team NCSA1</a>
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

