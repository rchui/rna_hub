import React, { Component } from 'react';
const axios = require('axios');

export default class Insert extends Component {
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
      });
    }
    updateStrain(event) {
      this.setState({
        strain: event.target.value,
      });
    }
    updatePrimaryAccession(event) {
      this.setState({
        primary_accession: event.target.value,
      });
    }
    updateDecision(event) {
      this.setState({
        decision: event.target.value,
      });
    }
    updateIsolation(event) {
      this.setState({
        isolation_source: event.target.value,
      });
    }
    updateCommonName(event) {
      this.setState({
        common_name: event.target.value,
      });
    }
    updateSequence(event) {
      this.setState({
        sequence: event.target.value,
      });
    }


  render() {
    return (
      <div >
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