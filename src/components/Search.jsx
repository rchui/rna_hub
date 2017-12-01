import React, { Component } from 'react';
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