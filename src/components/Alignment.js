import React, { Component } from 'react';
const axios = require('axios');


export default class Alignment extends Component {
  
  constructor() {
    super();
    this.handleQuery = this.handleQuery.bind(this);
    this.state = {
      gg_id_1: 14,
      gg_id_2: 10,
      sequence_1: [],
      sequence_2: []
    }
  }

  getText_1(event) {
    //this.text = text;
    event.preventDefault();
    this.setState({gg_id_1: event.target.value});
  }

  getText_2(event) {
    event.preventDefault();
    this.setState({gg_id_2: event.target.value});
  }

  handleQuery(event) {
      event.preventDefault();
      //console.log(this.refs);
   //// Get sequence alignment gg_id's

    axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/alignment/', {
       params: {
         gg_id_1: this.state.gg_id_1,
         gg_id_2: this.state.gg_id_2
       }
     })
     .then(response => {
       //console.log(response);
       console.log(response.data);
       var arr1 = this.chunkify(response.data[0], Math.ceil(response.data[0].length/105), false);
       var arr2 = this.chunkify(response.data[1], Math.ceil(response.data[1].length/105), false);
       //console.log(arr1);
       //console.log(arr2);
       this.setState({sequence_1: arr1, sequence_2: arr2});
     }).catch(error => {
       console.log(error);
     })
  }

  chunkify(a, n, balanced) {  
    if (n < 2)
        return [a];
    var len = a.length,
            out = [],
            i = 0,
            size;
    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, i += size));
        }
    }
    else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, i += size));
        }
    }
    else {
        n--;
        size = Math.floor(len / n);
        if (len % size === 0)
            size--;
        while (i < size * n) {
            out.push(a.slice(i, i += size));
        }
        out.push(a.slice(size * n));
    }
    return out;
  }


  render() {
    return (
      <div>
        <span className='field has-addons has-addons-left is-grouped'>
        <i className="icon fa fa-align-center fa-lg is-medium"></i>
        <h1 className="title is-4">Sequence Alignment</h1>
        </span>
        <div className='field has-addons has-addons-centered is-grouped'>
          <p className="control is-expanded">
            <input 
              onChange={this.getText_1.bind(this)}
              type="text" className="input is-hovered" placeholder="Search For RNA by Sequence ID" ref="sequenceID" />
            </p>
          <p className="control">
            <a className="button is-link " onClick={this.handleQuery}><strong>Align</strong></a> 
          </p>
          <p className="control is-expanded">
          <input 
              onChange={this.getText_2.bind(this)}
              type="text" className="input is-hovered" placeholder="Search For RNA by Sequence ID" ref="sequenceID" />
          </p>
        </div>

        <div >
          <div className="container is-fluid">
            <div className="sequence-align">
              { 
                this.state.sequence_1.map((a, i) => {
                  console.log(a);
                  console.log(this.state.sequence_2[i]);
                  const b = this.state.sequence_2[i];
                  //a.map((ch) => ch.toUpperCase);
                  //a = a.toUpperCase();
                  //const b = this.state.sequence_2[i].toUpperCase();
                  var line = a.map((ch, j) => {
                    if (a[j] == b[j])
                    {
                      return (
                        <strong style={{color: 'red'}} className="high">{a[j]}</strong>
                      );
                    } else {
                      return (
                        <strong style={{color: 'blue'}} className="high">{a[j]}</strong>
                      );
                    }

                  });

                  var line2= a.map((ch, j) => {
                    if (a[j] == b[j]) {
                      return(
                        <strong style={{color: 'red'}} className="high">{b[j]}</strong>
                      );
                    } else {
                      return (
                        <strong style={{color: 'blue'}} className="high">{b[j]}</strong>
                      );
                    }
                  });

                  return (
                    <div>
                    <p>seq1>> {line}</p>
                    <p>seq2>> {line2}</p>
                    <br/>
                    </div>
                  );
                })
              }
            </div>

          </div>
          { 


          
            /*this.state.sequence_1.map((char, i) =>  {
              var item = "";
              return (
              <div key={i} className="box has-text-left">
                <article className="med">
                  <div className="media-content">
                    <div className="content">
                      <i className="fa fa-trash is-pulled-right" onClick={() => {document.querySelector(".modal").classList.toggle("is-active"); }}></i>
                      <a className="link">Sequence ID: {item.GG_ID}</a>
                      <p>Common Name: {item.Common_name}</p>
                      <p>Primary Accession {item.Primary_accession}</p>
                      <p>Strain: {item.Strain}</p>
                      <p>Sequence: {item.Sequence.length} nucleotides</p>
                      <div className="container is-fluid">
                      <div className="Sequence-div has-text-info">{item.Sequence.toUpperCase()}</div>
                      </div>
                      <i className="fa fa-pencil-square-o is-pulled-right" onClick={() => {document.querySelectorAll(".modal")[1].classList.toggle("is-active"); }}></i>
                      <Delete handleDelete={this.handleDelete} gg_id={item.gg_id} />
     

                    </div>
                  </div>
                </article>
              </div>)}
            )
          */}
        </div>


        <div className="section">
        </div>
      </div>
    );
  }
}