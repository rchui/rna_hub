import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'

export default class Overview extends Component {
  render() {
    return (
        <div>
          {/*<div className="box">
            <div className="subtitle">Welcom to RNAHub</div>
            <p>Navigate on the menu to begin your journey</p>
          </div>*/}
          <div className="columns">
            <div className="column">
              <div className="box has-text-centered">
                <div className="subtitle"><i className="icon fa fa-search " /> Text Search </div>
                  <div>Search by unique ID, gene or other keyword</div>
                <Link to="/search">
                  <button className="button is-link">
                    Browse Sequences
                  </button>
                </Link>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <div className="subtitle"><i className="icon fa fa-puzzle-piece " /> Sequence Search </div>
                <div >Search for gene ID by sequence</div>
                <Link to="/seqsearch">
                  <button className="button is-link">
                    Search Sequences
                  </button>
                </Link>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <div className="subtitle"><i className="icon fa fa-align-center " /> Sequence Alignment </div>
                  <div>Explore RNA sequences pairwise alignments</div>
                  <Link to="/align">
                    <button className="button is-link">
                      Compute Alignment
                    </button>
                  </Link>
              </div>
            </div>
            <div className="column">
              <div className="box has-text-centered">
                <div className="subtitle"><i className="icon fa fa-search " /> Insert Sequence </div>
                  <div>Insert a new sequence into the database.</div>
                <Link to="/insert">
                  <button className="button is-link">
                    Insert Sequence
                  </button>
                </Link>
              </div>
			</div>
          </div>
          <div className="section">
          </div>
        </div>

    );
  }
}
