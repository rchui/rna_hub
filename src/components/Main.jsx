import React, { Component } from 'react';

export default class Main extends Component {
	render(){
		return (
			<div className="main" >
			    <section className="hero is-small is-primary">
	            <div className="hero-head">
	              <nav className="navbar">
	                <div className="container">
	                  <div className="navbar-brand">
	                    <figure className="image is-64x64">
	                    <img src="http://cdn.onlinewebfonts.com/svg/img_535039.png" alt="Logo" />
	                    </figure>
	                    <a className="navbar-item">
	                      <h1 className="title">RNAHUB</h1>
	                    </a>
	                  </div>
	                </div>
	              </nav>
	            </div>
	            <div class="hero-body">
	              <div className="title">RNAHUB</div>
	              <div className="subtitle">One stop shop for RNA.</div>
	            </div>
	            <div class="hero-foot">
	              <nav class="tabs is-boxed is-fullwidth">
	                <div class="container">
	                  <ul>
	                  	<li class="is-active" onClick={() => {document.querySelector("li").classList.toggle("is-active"); }}><a href="/">Home</a></li>
	                    <li><a href="/search">Search</a></li>
	                    <li><a href="/insert">Insert</a></li>
	                  </ul>
	                </div>
	              </nav>
	            </div>  
	          </section>
	          <div className="section">
	          </div>
			</div>
		);
	}
}