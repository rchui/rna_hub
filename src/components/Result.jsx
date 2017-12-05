import React, { Component } from 'react';
import Primer from './Primer';
import axios from 'axios';

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


export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gg_id: 1,
      data: [],
      publication: [],
      primer: [
        {
          seq: "",

        },
        {
          seq_2: ""
        }
      ]
    }
    this.handleQuery.bind(this);
    this.getPublication.bind(this);
    this.getPrimer.bind(this);
  }
  componentWillMount() {
    this.setState({gg_id: this.props.match.params.gg_id});
    this.handleQuery();
    this.getPublication();
    this.getPrimer();
  }

  handleQuery(){
      //console.log("Querying for gg_id ", this.props.match.params.gg_id);
      axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/sequence/', {
        params: {
          gg_id: this.props.match.params.gg_id
        }
      })
      .then(response => {
        //console.log(response);
        //console.log(response.data);
        this.setState({data: response.data});
      }).catch(error => {
        console.log(error);
      })
  }

  handleUpdate(data) {
    console.log("Update sequence with gg_id ", data.gg_id);
    document.querySelectorAll(".modal")[1].classList.toggle("is-active"); 
    axios.patch('http://fa17-cs411-48.cs.illinois.edu:8080/sequence', data)
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


  getPublication() {
     axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/publication/', {
       params: {
         gg_id: this.props.match.params.gg_id
       }
     })
     .then(response => {
       //console.log(response);
       this.setState({publication: response.data});
     }).catch(error => {
       console.log(error);
     })
  }

  toggleTab(name) {
    var i;
    var allTabs = document.querySelectorAll("li.tab");
    for (i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove("is-active");
    }
    document.querySelector(name).classList.add("is-active");
  }

  getPrimer() {
     axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/design/', {
       params: {
         gg_id: this.props.match.params.gg_id,
       }
     })
     .then(response => {
       //console.log(response);
       //console.log(response.data);
       this.setState({primer: response.data});
       console.log(this.state.primer);
     })
     .catch(error => {
       console.log(error);
     })
  }

  /*computeGC(primer) {
    var i = 0;
    var GC = 0;
    for (i = 0; i < primer.length; i++) {
      if (primer.charAt(i) === 'C' || primer.charAt(i) === 'G')
        GC++;
    }
    //console.log(GC);
    //console.log(GC/primer.length);
    return GC/primer.length;
  }*/

  render() {
    //console.log(this.state.data[0]);
    if (this.state.data[0] == null) {
      var item = {
        GG_ID: this.state.gg_id,
        common_name: "",
        decision: "",
        isolation_source: "",
        primary_accession: "",
        sequence: "",
        strain: ""
      }

    } else{
      var item = {
        gg_id: this.state.gg_id,
        common_name: this.state.data[0].Common_name || "NaN",
        decision: this.state.data[0].Decision || "NaN",
        isolation_source: this.state.data[0].Isolation_source || "NaN",
        primary_accession: this.state.data[0].Primary_accession || "NaN", 
        sequence: this.state.data[0].Sequence || "",
        strain: this.state.data[0].Strain || "NaN"
      }
    }

    if (this.state.primer[0] == null) {
      var seq1 = {};
      var seq2 = {};
    } else {
      var seq1 = this.state.primer[0].seq;
      var seq2 = this.state.primer[1];
    }



    function updateStrain(event) {
      item.strain= event.target.value;
    }
    function updatePrimaryAccession(event) {
      item.primary_accession = event.target.value;
    }
    function updateDecision(event) {
      item.decision = event.target.value;
    }
    function updateIsolation(event) {
      item.isolation_source = event.target.value;
    }
    function updateCommonName(event) {
      item.common_name = event.target.value;
    }
    function updateSequence(event) {
      item.sequence = event.target.value;
      console.log(item.sequence);
    }

    return (
        <div>
          <div className="bo">
            <div className="subtitle">
              Sequence <strong>{this.props.match.params.gg_id}</strong>
            </div>
            <hr/>
            <nav className="tabs is-boxed is-primary">
              <div className="container">
                <ul>

                  <li className="tab is-active overview" onClick={() => {
                    var i;
                    var allTabs = document.querySelectorAll("li.tab");
                    var x = document.getElementById("overview");
                    var y = document.getElementById("publication");
                    var z = document.getElementById("primer");
                    x.style.display = "block";
                    y.style.display = "none";
                    z.style.display = "none";
                    for (i = 0; i < allTabs.length; i++) {
                        allTabs[i].classList.remove("is-active");
                    }
                    document.querySelector("li.overview").classList.add("is-active");
                  }
                  }><a >Overview</a></li>

                  <li className="tab publication" onClick={(name) => {
                    var i;
                    var allTabs = document.querySelectorAll("li.tab");
                    var x = document.getElementById("overview");
                    var y = document.getElementById("publication");
                    var z = document.getElementById("primer");
                    x.style.display = "none";
                    y.style.display = "block";
                    z.style.display = "none";
                    for (i = 0; i < allTabs.length; i++) {
                        allTabs[i].classList.remove("is-active");
                    }
                    document.querySelector("li.publication").classList.add("is-active");
                  }
                  }><a >Publications</a></li>


                  <li className="tab taxonomy" onClick={() => {
                    var i;
                    var allTabs = document.querySelectorAll("li.tab");
                    var x = document.getElementById("overview");
                    var y = document.getElementById("publication");
                    var z = document.getElementById("primer");
                    x.style.display = "none";
                    y.style.display = "none";
                    z.style.display = "block";
                    for (i = 0; i < allTabs.length; i++) {
                        allTabs[i].classList.remove("is-active");
                    }
                    document.querySelector("li.taxonomy").classList.add("is-active");
                  }
                  }><a >PrimerDesign</a></li>

                </ul>
              </div>
            </nav>

            <div id="overview">
              <div className="box has-text-left">
                <article className="med">
                  <div className="media-content">
                    <div className="content">
                      <i className="icon fa fa-trash is-pulled-right fa-lg is-medium" onClick={() => {document.querySelector(".modal").classList.toggle("is-active"); }}></i>
                      <i className="icon fa fa-pencil-square-o is-pulled-right fa-lg is-large" onClick={() => {document.querySelectorAll(".modal")[1].classList.toggle("is-active"); }}></i>

                      <p><strong>Common Name: </strong>{item.common_name}</p>
                      <p><strong>Primary Accession: </strong>{item.primary_accession}</p>
                      <p><strong>Strain: </strong>{item.strain}</p>
                      <p><strong>Decision: </strong>{item.decision}</p>
                      <p><strong>Isolation: </strong>{item.isolation_source}</p>
                      <p><strong>Sequence: </strong>{item.sequence.length} nucleotides</p>
                      <div className="container is-fluid">
                        <div className="Sequence-div2 has-text-info">{item.sequence.toUpperCase()}
                        </div>
                      </div>
                      
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
                            <button className="button is-success" onClick={() => { this.handleDelete(item.gg_id) }}>Delete</button>
                            <button className="button" onClick={() => { document.querySelector(".modal").classList.toggle("is-active"); }}>Cancel</button>
                          </footer>
                        </div>
                      </div>

     {/*Update modal*/}
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
                                  className="input is-static" 
                                  defaultValue={this.state.gg_id}
                                  ref="updateID" 
                                  read-only="true" />
                              </div>
                              <div className="field">
                                <label className="label has-text-left">Common Name: </label>
                                <input 
                                  type="text" 
                                  className="input" 
                                  placeholder={item.common_name}
                                  ref="updateID" 
                                  onChange={updateCommonName} />
                              </div>
                              <div className="field">
                                <label className="label has-text-left">Strain: </label>
                                <input 
                                  type="text" 
                                  className="input" 
                                  placeholder={item.strain}
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
                            <button className="button is-success" onClick={() => { this.handleUpdate(item)}}>Update</button>
                            <button className="button" onClick={() => { document.querySelectorAll(".modal")[1].classList.toggle("is-active"); }}>Cancel</button>
                          </footer>
                        </div>
                      </div>
      {/*end update modal*/}






                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div id="publication" className="section" hidden="true">
            <ol className="tab publication" id="myOl" >
            {
              this.state.publication.map((pub, key) =>
                 <li key={key}>
                  <div className="box">
                  <p><strong>{pub.Publication_title}</strong></p>
                  <p>{pub.Primary_author} et al.  </p>
                  <p>Pubmed ID: {pub.Pubmed_ID}</p>
                  </div>
                 </li>
              )
            }
            </ol> 
            </div>

          <div id="primer" hidden="true">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Primer</th>
                  <th><abbr title="Position">Sequence (5'->3')</abbr></th>
                  <th>Template strand</th>
                  <th><abbr title="Primer Length">Length</abbr></th>
                  <th><abbr title="Start position">Start</abbr></th>
                  <th><abbr title="End position">End</abbr></th>
                  <th><abbr title="MeltingTemperature">Tm</abbr></th>
                  <th><abbr title="GC content percentage">GC%</abbr></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Forward primer</th>
                  <td>{this.state.primer[0].seq}</td>
                  <td>plus</td>
                  <td>{this.state.primer[0].seq.length}</td>
                  <td>{this.state.primer[0].startidx}</td>
                  <td>{this.state.primer[0].endidx}</td>
                  <td>{this.state.primer[0].melt}</td>
                  <td>{this.state.primer[0].gc}</td>
                </tr>
                <tr>
                  <th>Reverse primer</th>
                  <td>{this.state.primer[1].seq_2}</td>
                  <td>minus</td>
                  <td>{this.state.primer[1].seq_2.length}</td>
                  <td>{this.state.primer[1].startidx}</td>
                  <td>{this.state.primer[1].endidx}</td>
                  <td>{this.state.primer[1].melt_2}</td>
                  <td>{this.state.primer[1].gc}</td>
                </tr>
              </tbody>
            </table>
          </div>


          </div>
          <div className="section" >
          </div>
          <div className="section" >
          </div>
        </div>
    );
  }
}
