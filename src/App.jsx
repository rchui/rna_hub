import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://fa17-cs411-48.cs.illinois.edu:3306';
axios.get('/sql/db/SELECT+1')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="hero is-primary is-fullheight">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">RNA HUB</h1>
              <h2 className="subtitle">One stop shop for RNA.</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
