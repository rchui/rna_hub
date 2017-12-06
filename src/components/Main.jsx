import React, { Component } from 'react';

export default class Main extends Component {
	render(){
		return (
			<div className="main" >
			    <section className="hero is-small is-primary">
	            <div className="hero-head">
	              <nav className="navbar">
	              	<div className="container is-fluid">
	                  <div className="navbar-brand">
	                    <figure className="image is-64x64">
	                    <img src={require('../dna2.png')} alt="Logo" />
	                    </figure>
	                    <a href="/" className="navbar-item">
	                      <h1 className="title is-2">RNAHUB</h1>
	                    </a>
	                  </div>
	                  <div id="navbarMenuHeroA" className="navbar-menu">
	                    <div className="navbar-end is-active">
	                      <a href="/" className="navbar-item">
	                        Home
	                      </a>
	                      <a href="/examples" className="navbar-item">
	                        About
	                      </a>
	                    </div>
	                  </div>
	         		</div>
	              </nav>
	            </div>
	            <div className="hero-body has-text-centered">
	              <div className="title is-2">RNAHUB</div>
	              <div className="subtitle is-4">One stop shop for RNA.</div>
	            </div>
	            {/*<div className="hero-foot">
	              <nav className="tabs is-boxed is-fullwidth">
	                <div className="container">
	                  <ul>
	                  	<li className="is-active" onClick={() => {document.querySelector("li").classList.toggle("is-active"); }}><a href="/">Home</a></li>
	                    <li onClick={() => {document.querySelector("li").classList.toggle("is-active"); }}><a href="/search">Search</a></li>
	                    <li><a href="/insert">Insert</a></li>
	                  </ul>
	                </div>
	              </nav>
	            </div>  */}
	          </section>
	          <br/>
	          <br/>
			</div>
		);
	}
}