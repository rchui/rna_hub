import React, { Component } from 'react';
import Result from './Result';
const axios = require('axios');


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

export default class Search extends Component {
  
  constructor() {
    super();
    this.handleQuery = this.handleQuery.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      id: -1,
      family: "",
      data: []
    }
  }

  getText(event) {
    //this.text = text;
    console.log(event.target.value);
    var num = parseInt(event.target.value) || -1;
    console.log(num);
    if (num < 0) {
      this.setState({family: event.target.value});
    } else {
      this.setState({id: event.target.value});
    }
  }

  handleQuery(event) {
      event.preventDefault();
      //console.log(this.refs);
      if (this.state.id < 0) {
        this.handleFamilyQuery();
      } else {
        this.handleIDQuery();
      }
  }

  handleIDQuery(){
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

  handleFamilyQuery(){
      let family = this.state.family;
      console.log("Querying for family ", family);
       axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/species/', {
       params: {
         family: family,
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

  /*updateID(event, id) {
    console.log(id, ": ", event);
    //document.getElementById(id)
  }*/

  render() {
    /*var sequences = this.state.data.map((item, i) => {
      return(
        <Recipe key={i} sequence={item} id={item.GG_ID} showRecipe={this.showRecipe}
          delete={this.handleDelete}
          onSubmit={this.modifyRecipe}
          onerror={this.onerror}/>
    );
    });*/

    return (
      <div>
        <div className='field has-addons has-addons-centered is-grouped'>
          <div className='control'>
            <i className="fa fa-search"></i>
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

              const url = `/result/${item.GG_ID}`;

              return (
              <div key={i} className="box has-text-left">
                <article className="med">
                  <div className="media-content">
                    <div className="content">
                      <a href={url} className="link">Sequence ID: {item.GG_ID}</a>
                      <p><strong>Common Name: </strong>{item.Common_name || "NaN" }</p>
                      <p><strong>Primary Accession </strong>{item.Primary_accession || "NaN" }</p>
                      <p><strong>Strain: </strong>{item.Strain || "NaN"}</p>
                      {/*<p>Sequence: {item.Sequence.length} nucleotides</p>
                      <div className="container is-fluid">
                        <div className="Sequence-div has-text-info">{item.Sequence.toUpperCase()}
                        </div>
                      </div>*/}

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
  }
}