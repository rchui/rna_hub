import React, { Component } from 'react';
const axios = require('axios');


export default class SeqSearch extends Component {
  
  constructor() {
    super();
    this.handleQuery = this.handleQuery.bind(this);
    this.state = {
      sequence: "",
      data: [],
      query: false
    }
  }

  getText(event) {
    //this.text = text;
    this.setState({sequence: event.target.value});
  }

  handleQuery(event) {
      event.preventDefault();
      this.setState({query: true});
      console.log("Querying for sequence");
       axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/fromSequence/', {
         params: {
          sequence: this.state.sequence.toUpperCase()
        }
       })
       .then(response => {
          //console.log(response);
          console.log(response.data);
          this.setState({data: response.data});
       }).catch(error => {
          console.log(error);
       })
  }


  clearText(event){
    event.preventDefault();
    this.setState({sequence: ""});
    document.getElementById('seqinput').value = "";
  }

  /*updateID(event, id) {
    console.log(id, ": ", event);
    //document.getElementById(id)
  }*/

  render() {
    if (this.state.data[0] != null || this.state.query == false) {
      return (
        <div>
          <div className='field has-addons has-addons-centered is-grouped'>
            <div className='control'>
              <i className="fa fa-search"></i>
            </div>
            <p className="control is-expanded">
              <textarea 
                id="seqinput"
                onChange={this.getText.bind(this)}
                type="text" className="textarea is-hovered" placeholder="Search For RNA by Sequence ID" ref="sequenceID" />
            </p>

          </div>
          <div className='field has-addons has-addons-centered is-grouped'>
            <p className="control">
              <a className="button is-link " onClick={this.handleQuery}>Submit</a> 
            </p>
            <p className="control">
              <a className="button " onClick={this.clearText.bind(this)}>Clear</a> 
            </p>
          </div>
        

          <div>
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

                const url = `/result/${item.GG_ID}`;

                return (
                <div key={i} className="box has-text-left">
                  <article className="med">
                    <div className="media-content">
                      <div className="content">
                        <a href={url} className="link">Sequence ID: {item.GG_ID}</a>
                        <p>Common Name: {item.Common_name}</p>
                        <p>Primary Accession {item.Primary_accession}</p>
                        <p>Strain: {item.Strain}</p>
                      </div>
                    </div>
                  </article>
                </div>)}
              )
            }
          </div>
          <div className="section">
          </div>
        </div>
      );
    } else {
      return(
        <div>
          <div className='field has-addons has-addons-centered is-grouped'>
            <div className='control'>
              <i className="fa fa-search"></i>
            </div>
            <p className="control is-expanded">
              <textarea
                id="seqinput"
                onChange={this.getText.bind(this)}
                type="text" className="textarea is-hovered" placeholder="Search For RNA by Sequence ID" ref="sequenceID" />
            </p>
          </div>
          <div className='field has-addons has-addons-centered is-grouped'>
            <p className="control">
              <a className="button is-link " onClick={this.handleQuery}>Submit</a> 
            </p>
            <p className="control">
              <a className="button " onClick={this.clearText.bind(this)}>Clear</a> 
            </p>
          </div>
          <div className="button is-danger is-static">
          No mathces found
          </div>
          <div className="section">
          </div>
        </div>
      );
    } 
  }
}