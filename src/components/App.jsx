import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import 'react-navigate/src/Navigation.css'
import '../stylesheets/App.css';


/*       <a class="navbar-item">
            <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
          </a>
          
           <div className="hero-body">
            <div className="container">
              <body>
                <h1 className="title">RNA HUB</h1>
                <h2 className="subtitle">One stop shop for RNA.</h2>
              </body>
            </div>
          </div> 

          <div class="hero-foot">
            <nav class="tabs">
              <div class="container">
                <ul>
                  <li class="is-active"><a>Overview</a></li>
                  <li><a>Sequence</a></li>
                  <li><a>Layout</a></li>
                </ul>
              </div>
            </nav>
          </div>
          */
const axios = require('axios');
class App extends Component {
  render() {
    return (
      <Router> 
        <div className="App">
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
                  {/*<div id="navbarMenuHeroA" class="navbar-menu">
                    <div className="navbar-end is-active">
                      <a className="navbar-item">
                        Home
                      </a>
                      <a className="navbar-item">
                        Examples
                      </a>
                      <a className="navbar-item">
                        Documentation
                      </a>
                      <span class="navbar-item">
                        <a class="button is-primary is-inverted">
                          <span class="icon">
                            <i class="fa fa-github"></i>
                          </span>
                          <span>Download</span>
                        </a>
                      </span>
                    </div>
                  </div> */}
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
                    <li class="is-link"><Link to="/overview">Overview</Link></li>
                    <li><a href="/search">Search</a></li>
                    <li><a href="/insert">Insert</a></li>
                    <li><a href="/delete">Delete</a></li>
                    <li><a href="/update">Update</a></li>
                  </ul>
                </div>
              </nav>
            </div>   
            
          </section>
         
          <section className="section">
            <div className="container">
              <Route path="/overview" component={Overview}/>
            </div>
            <div className="container">
              <Route path="/search" component={Search}/>
            </div>
            <div className="container">
              <Route path="/insert" component={Insert}/>
            </div>
            <div className="container">
              <Route path="/delete" component={Delete}/>
            </div>
            <div className="container">
              <Route path="/update" component={Update}/>
            </div>

          </section>
        </div>
      </Router>
    );
  }
}


export default App;
 
class Overview extends Component {
  render() {
    return (
        <div>
          <div className="box">
            <div className="subtitle">Welcom to RNAHub</div>
            <p>Navigate on the menu to begin your journey</p>
          </div>
        </div>
    );
  }
}

class Search extends Component {
  
  constructor() {
    super();
    this.handleQuery = this.handleQuery.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      id: "",
      data: []
    }
  }

  getText(event) {
    //this.text = text;
    this.setState({id: event.target.value, data: this.state.data});
  }

  handleQuery(event) {
      //event.preventDefault();
      //console.log(this.refs);
      let seqId = this.state.id;
      console.log("Querying for gg_id ", seqId);
      axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/sequence/', {
        params: {
          gg_id: this.state.id
        }
      })
      .then(response => {
        //console.log(response);
        console.log(response.data);
        this.setState({id: this.state.id, data: response.data});
      }).catch(error => {
        console.log(error);
      })
  }

  handleDelete(id) {
    console.log("Delete sequence with gg_id ", id);
    //this.setState({id: id, data: []});
    document.querySelector(".modal").classList.toggle("is-active"); 
    axios.delete(`http://fa17-cs411-48.cs.illinois.edu:8080/sequence/${id}`, {
    })
    .then(response => {
      //console.log(response);
      this.handleQuery();
    }).catch(error => {
      console.log(error);
    })
    
  }

  handleUpdate(data) {
    console.log("Update sequence with gg_id ", data.id);
    document.querySelectorAll(".modal")[1].classList.toggle("is-active"); 
    axios.post('http://fa17-cs411-48.cs.illinois.edu:8080/sequence', data)
    .then(response => {
      //console.log(response);
      this.handleQuery();
    }).catch(error => {
      console.log(error);
    })
  }

  /*updateID(event, id) {
    console.log(id, ": ", event);
    //document.getElementById(id)
  }*/

  render() {
    return (
      <div>
        <div className='field has-addons has-addons-centered is-grouped'>
          <div className='control'>
            <i class="fa fa-search"></i>
          </div>
          <p className="control is-expanded">
            <input 
              onChange={this.getText.bind(this)}
              type="text" className="input is-hovered" placeholder="Search For RNA by Sequence ID" ref="sequenceID" />
          </p>
          <p className="control">
            <a className="button is-link " onClick={this.handleQuery}>Submit</a> 
          </p>
        </div>

        <div >
          { 
            this.state.data.map((item, i) =>  {
              function updateStrain(event) {
                item_data.strain= event.target.value;
              }
              function updatePrimaryAccession(event) {
                item_data.primary_accession = event.target.value;
              }
              function updateDecision(event) {
                item_data.decision = event.target.value;
              }
              function updateIsolation(event) {
                item_data.isolation_source = event.target.value;
              }
              function updateCommonName(event) {
                item_data.common_name = event.target.value;
              }
              function updateSequence(event) {
                item_data.sequence = event.target.value;
                console.log(item_data.sequence);
              }

              var item_data = {
                gg_id: item.GG_ID,
                strain: item.Strain,
                primary_accession: item.Primary_accession,
                decision: item.Decision,
                isolation_source: item.Isolation_source,
                common_name: item.Common_name,
                sequence: item.Sequence,
              }

              return (
              <div className="box has-text-left">
                <article className="med">
                  <div className="media-content">
                    <div className="content">
                      <i className="fa fa-trash is-pulled-right" onClick={() => {document.querySelector(".modal").classList.toggle("is-active"); }}></i>
                      <a className="link">Sequence ID: {item.GG_ID}</a>
                      <p>Common Name: {item.Common_name}</p>
                      <div>Primary Accession {item.Primary_accession}</div>
                      <p>Strain: {item.Strain}</p>
                      <p>Sequence: {item.Sequence.length} nucleotides</p>
                      <div className="container is-fluid">
                      <div className="Sequence-div has-text-info">{item.Sequence.toUpperCase()}</div>
                      </div>
                      <i class="fa fa-pencil-square-o is-pulled-right" onClick={() => {document.querySelectorAll(".modal")[1].classList.toggle("is-active"); }}></i>
                      
      {/*Delete model*/}
                      <div className="modal">
                        <div className="modal-background"></div>
                        <div className="modal-card">
                          <header className="modal-card-head">
                            <p className="modal-card-title">Confirm Delete</p>
                            <button className="delete" aria-label="close" onClick={() => { document.querySelector(".modal").classList.toggle("is-active");}}></button>
                          </header>
                          <section className="modal-card-body">
                            <div>
                              Are you sure you want to delete sequence {item.GG_ID}?
                            </div>
                          </section>
                          <footer className="modal-card-foot">
                            <button className="button is-success" onClick={() => { this.handleDelete(item.GG_ID) }}>Delete</button>
                            <button className="button" onClick={() => { document.querySelector(".modal").classList.toggle("is-active"); }}>Cancel</button>
                          </footer>
                        </div>
                      </div>

      {/*Update modl*/}
                      <div className="modal">
                        <div className="modal-background"></div>
                        <div className="modal-card">
                          <header className="modal-card-head">
                            <p className="modal-card-title">Confirm Update</p>
                            <button className="delete" aria-label="close" onClick={() => { document.querySelectorAll(".modal")[1].classList.toggle("is-active");}}></button>
                          </header>
                          <section className="modal-card-body">
        {/*Modal: Update Form*/}
                            <form className="form">
                              <div className="field">
                                <label className="label has-text-left">Sequence ID: </label>
                                <input 
                                  type="text" 
                                  className="input" 
                                  value={item_data.gg_id}
                                  ref="updateID" 
                                  read-only />
                              </div>
                              <div className="field">
                                <label className="label has-text-left">Common Name: </label>
                                <input 
                                  type="text" 
                                  className="input" 
                                  placeholder={item_data.common_name}
                                  ref="updateID" 
                                  onChange={updateCommonName} />
                              </div>
                              <div className="field">
                                <label className="label has-text-left">Strain: </label>
                                <input 
                                  type="text" 
                                  className="input" 
                                  placeholder={item_data.strain}
                                  ref="updateID" 
                                  onChange={updateStrain} />
                              </div>
                              <div className="field has-addons">
                                <div className="control is-expanded">
                                  <label className="label">Sequence: </label>
                                  <textarea className="textarea" placeholder={item.Sequence} onChange={updateSequence}></textarea>
                                </div>
                              </div>
                            </form>
              
                          </section>
                          <footer className="modal-card-foot">
                            <button className="button is-success" onClick={() => { this.handleUpdate(item_data)}}>Update</button>
                            <button className="button" onClick={() => { document.querySelectorAll(".modal")[1].classList.toggle("is-active"); }}>Cancel</button>
                          </footer>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>)}
            
            )
          }
        </div>
      </div>
    );
  }
}


//TODO: create a sequence class just like RNACentral, make the box clickable and will navigate to this page.
const Sequence = {

}
/*GG_ID, Strain, Primary_accession, Decision, Isolation_source, Common_name, Sequence*/

class Insert extends Component {
  constructor() {
    super();
    this.handleInsert = this.handleInsert.bind(this);
    this.updateID = this.updateID.bind(this);
    this.updateStrain = this.updateStrain.bind(this);
    this.updateDecision = this.updateDecision.bind(this);
    this.updatePrimaryAccession = this.updatePrimaryAccession.bind(this);
    this.updateIsolation = this.updateIsolation.bind(this);
    this.updateCommonName = this.updateCommonName.bind(this);
    this.updateSequence = this.updateSequence.bind(this);
    this.state = {
      gg_id: "",
      strain: "",
      primary_accession: "",
      decision: "",
      isolation_source: "",
      common_name: "",
      sequence: ""
    }
  }
  handleInsert() {
    axios.post('http://fa17-cs411-48.cs.illinois.edu:8080/sequence', this.state)
    .then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  }

    updateID(event) {
      this.setState({
        gg_id: event.target.value,
        strain: this.state.strain,
        primary_accession: this.state.primary_accession,
        decision: this.state.decision,
        isolation_source: this.state.isolation_source,
        common_name: this.state.common_name,
        sequence: this.state.sequence,
      });
    }
    updateStrain(event) {
      this.setState({
        gg_id: this.state.gg_id,
        strain: event.target.value,
        primary_accession: this.state.primary_accession,
        decision: this.state.decision,
        isolation_source: this.state.isolation_source,
        common_name: this.state.common_name,
        sequence: this.state.sequence,
      });
    }
    updatePrimaryAccession(event) {
      this.setState({
        gg_id: this.state.gg_id,
        strain: this.state.strain,
        primary_accession: event.target.value,
        decision: this.state.decision,
        isolation_source: this.state.isolation_source,
        common_name: this.state.common_name,
        sequence: this.state.sequence,
      });
    }
    updateDecision(event) {
      this.setState({
        gg_id: this.state.gg_id,
        strain: this.state.strain,
        primary_accession: this.state.primary_accession,
        decision: event.target.value,
        isolation_source: this.state.isolation_source,
        common_name: this.state.common_name,
        sequence: this.state.sequence,
      });
    }
    updateIsolation(event) {
      this.setState({
        gg_id: this.state.gg_id,
        strain: this.state.strain,
        primary_accession: this.state.primary_accession,
        decision: this.state.decision,
        isolation_source: event.target.value,
        common_name: this.state.common_name,
        sequence: this.state.sequence,
      });
    }
    updateCommonName(event) {
      this.setState({
        gg_id: this.state.gg_id,
        strain: this.state.strain,
        primary_accession: this.state.primary_accession,
        decision: this.state.decision,
        isolation_source: this.state.isolation_source,
        common_name: event.target.value,
        sequence: this.state.sequence,
      });
    }
    updateSequence(event) {
      this.setState({
        gg_id: this.state.gg_id,
        strain: this.state.strain,
        primary_accession: this.state.primary_accession,
        decision: this.state.decision,
        isolation_source: this.state.isolation_source,
        common_name: this.state.common_name,
        sequence: event.target.value,
      });
    }


  render() {
   /* var item_data = {
      gg_id: "",
      strain: "",
      primary_accession: "something",
      decision: "change",
      isolation_source: "later",
      common_name: "",
      sequence: "",
    }
    function updateID(event) {
      item_data.gg_id = event.target.value;
    }
    function updateStrain(event) {
      item_data.strain = event.target.value;
    }
    function updatePrimaryAccession(event) {
      item_data.primary_accession = event.target.value;
    }
    function updateDecision(event) {
      item_data.decision = event.target.value;
    }
    function updateIsolation(event) {
      item_data.isolation_source = event.target.value;
    }
    function updateCommonName(event) {
      item_data.common_name = event.target.value;
    }
    function updateSequence(event) {
      item_data.sequence = event.target.value;
      console.log(item_data.sequence);
    }*/
    return (
      <div >
        {/*<div className="field has-addons">
          <div className="control">
            <i class="fa fa-plus-circle"></i>
          </div>
          <div className="control">
            <label className="label">Sequence</label>
            <textarea className="textarea" placeholder="e.g. ATCCGUTG"></textarea>
            
          </div>
        </div>*/}
        
        
        <form className="form is-boxed">
          <label className="label has-text-left">Insert by Upload</label>
          <div class="field">
            <div class="file is-link"> {/*TODO: implement this, toggle has-name and span*/}
              <label class="file-label">
                <input class="file-input" type="file" name="resume"/>
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-cloud-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
                {/*<span class="file-name">
                  Screen Shot 2017-07-29 at 15.54.25.png
                </span>*/}
              </label>
            </div>
          </div>
          <label className="label has-text-left">Insert Manually</label>
          <div className="box">
            <div className="field">
              <label className="label has-text-left">Sequence ID: </label>
              <input 
                type="text" 
                className="input" 
                placeholder="e.g. 0000"
                ref="updateID" 
                onChange={this.updateID}
                />
            </div>
            <div className="field">
              <label className="label has-text-left">Common Name: </label>
              <input 
                type="text" 
                className="input" 
                placeholder="e.g. Human "
                ref="updateID" 
                onChange={this.updateCommonName}
                />
            </div>
            <div className="field">
              <label className="label has-text-left">Strain: </label>
              <input 
                type="text" 
                className="input" 
                placeholder="e.g. Homo Sapien"
                ref="updateID" 
                onChange={this.updateStrain}
                />
            </div>
            <div className="field has-addons">
              <div className="control is-expanded">
                <label className="label">Sequence: </label>
                <textarea className="textarea" placeholder="e.g ATCCGUTG " onChange={this.updateSequence}></textarea>
              </div>
            </div>
            <a className="button is-link" onClick={this.handleInsert}>Submit</a>
          </div>
        </form>
        
        
      </div>
    );
  }
}

class Delete extends Component {
  constructor() {
    super();
    this.state={
        id: '',
    };
  }


  confirmDelete = {

  }

  getText(event) {
    //console.log(event.target.value);
    //this.text = text;
    this.setState({id: event.target.value});
  }

  render() {
    return (
      <div className="field has-addons is-grouped has-addons-centered is-grouped">
        <div className="control">
          <i class="fa fa-trash"></i>
        </div>
        <div className="control is-expanded">
          <input 
            type="text" 
            className="input is-hovered" 
            placeholder="Search For RNA by Sequence ID" 
            ref="sequenceID" 
            onChange={this.getText.bind(this)}
          />
        </div>
        <div className="control">
          <a className="button is-link is-small" onClick={() => { let menu = document.querySelector(".modal"); menu.classList.toggle("is-active"); }} >Submit</a>
        </div>
        <Submit id='HI'/>
      </div>
    );
  }
}

const Submit = () => (
  <div className="modal">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Confirm Delete</p>
        <button className="delete" aria-label="close" onClick={() => {document.querySelector(".modal").classList.toggle("is-active");}}></button>
      </header>
      <section className="modal-card-body">
        <div>
          Are you sure you want to delete sequence {this.id}?
        </div>
      </section>
      <footer className="modal-card-foot">
        <button className="button is-success">Delete</button>
        <button className="button" onClick={() => { let menu = document.querySelector(".modal"); menu.classList.toggle("is-active"); }}>Cancel</button>
      </footer>
    </div>
  </div>
)

class Update extends Component {
  constructor() {
    super();
    this.state = {
      sequence: []
    }
  }
 
  render() {
    return (
      <div className="field">
       <i className="fa fa-pencil-square-o"></i>
        <label className="label">Update</label>
        <div className="control">
          <input type="text" className="input is-hovered" placeholder="Search For RNA by Sequence ID" ref="sequenceID" />
          <a className="button is-link is-small" onClick={this.handleQuery}>Submit</a>
        </div>
        <UploadFile />
      </div>
    );
  }
}


class UploadFile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div class="file">
        <label class="file-label">
          <input class="file-input" type="file" name="resume"/>
          <span class="file-cta">
            <span class="file-icon">
              <i class="fa fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
        </label>
      </div>
    );
  }
}


/*
              var item_data = {
                gg_id: item.GG_ID,
                strain: item.Strain,
                primary_accession: item.Primary_accession,
                decision: item.Decision,
                isolation_source: item.Isolation_source,
                common_name: item.Common_name,
                sequence: item.Sequence,
              }
            */
