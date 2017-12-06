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
            
            <h2>Features</h2>
            <p>Here you should be able to achieve the basic functionality of searching, inserting and  <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.</p>
            <ul>
              <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
              <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
              <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
              <li>Ut non enim metus.</li>
            </ul>
           
            <blockquote>Ut venenatis, nisl scelerisque sollicitudin fermentum, quam libero hendrerit ipsum, ut blandit est tellus sit amet turpis.</blockquote>
            <p>Quisque at semper enim, eu hendrerit odio. Etiam auctor nisl et <em>justo sodales</em> elementum. Maecenas ultrices lacus quis neque consectetur, et lobortis nisi molestie.</p>
            <p>Sed sagittis enim ac tortor maximus rutrum. Nulla facilisi. Donec mattis vulputate risus in luctus. Maecenas vestibulum interdum commodo.</p>
            <dl>
              <dt>Web</dt>
              <dd>The part of the Internet that contains websites and web pages</dd>
              <dt>HTML</dt>
              <dd>A markup language for creating web pages</dd>
              <dt>CSS</dt>
              <dd>A technology to make HTML look better</dd>
            </dl>

          </div>
          <div className="section">
          </div>
        </div>

    );
  }
}