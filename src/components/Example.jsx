import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

export default class Example extends Component {
  render() {
    return (
        <div className="container">
          <div class="content">
            <h1>Welcome to RNAHub</h1>
            <p>RNAHub is a public resource that offers convenient access to a comprehensive and up-to-date database of 16S RNA sequences provided by <a href="http://greengenes.secondgenome.com">GreenGenes Databases</a>. 
            RNAHub will benefit evolutionary biological research by creating a one stop shop for evolutionary biologists, and contribute to the general body of knowledge.
            </p>
            <h2>Our Mission</h2>
            <p> Our website's database is hosting a specific type of RNA, called 16S rRNA, which is highly similar across closely related species. This can be useful for researchers who are interested in classifying organisms in the tree of life because 16S rRNA can be used to calculate evolutionary distance between species by comparing their sequence similarities.
             We will also provide information on publications that have referenced any published 16S rRNA sequences in order bridge the gap between raw and published knowledge.</p>
          </div>
          <div className="section">
          </div>
        </div>

    );
  }
}