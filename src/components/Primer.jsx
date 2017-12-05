import React, { Component } from 'react';

export default class Primer extends Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			seq_1: this.props.seq1.seq,
			seq_2: this.props.data[1].seq_2,
			sidx_1: this.props.data[0].startidx,
			eidx_1: this.props.data[0].endidx,
			sidx_2: this.props.data[1].startidx,
			eidx_1: this.props.data[1].endidx,
			tm_1: this.props.data[0].melt,
			tm_2: this.props.data[1].melt,
			gc1: this.props.data[0].gc,
			gc2: this.props.data[1].gc
		}
	}

  render() {
    return (
      <div>
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
				      <td>{this.state.seq_1}</td>
				      <td>Plus</td>
				      <td>23</td>
				      <td>12</td>
				      <td>3</td>
				      <td>68</td>
				      <td>36</td>
				    </tr>
				    <tr>
				      <th>Reverse primer</th>
				      <td>sequence</td>
				      <td>Minus</td>
				      <td>20</td>
				      <td>11</td>
				      <td>7</td>
				      <td>65</td>
				      <td>36</td>
				    </tr>
				  </tbody>
				</table>
      </div>

    );
  }
}