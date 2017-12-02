import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './config/routes';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();


const axios = require('axios');

//// Seach by sequence

// axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/fromSequence/', {
//     params: {
// 		sequence: 'GGCTCAGTAACACGTAGCCAACCTACCCTATGGACGGGGATAACCTCCGGAAACTGAGGATAAACCCCGATAGATCATTATACCTGGAACGGTTTATGGTCCAAATGATTCCTCCCCCTAGGATGGGACTGCGGCCTATCACCTTGTTGGTGAGGTAATGGCCCACCAAGGCTATTACAGGTACGGGCTCTGAGAGGAGAAGCCCGGAGATGGTACTGAGACACGAACCCAGGCCTTATGGGGCGCAGCAGGCGAGAAAACTTTGCAATGTGCGCAAGCACGACAAGGTTAATCCGAGTGATTCCTGCTAAAGGAATCTTTTGCTAGTCCTAAAAACACTAGCGAATAAGGGGTGGGCAAGTTCTGGTGTCAGCCGCCGCGGTAAAACCAGCACCTCAAGTGGTCAGGAGGATTATTGGGCCTAAAGCATCCGTAGCCTGCTCTGTAAGTTTCCGGTTAAATCCATTAGCTTAACTGATGGGCCGCCGGAAAAACTGCAGAGCTAGGGAGTGGGAGAGGTAGACGGTACTCAGTAGGAAGGGGTAAAATCCTTTGATCTATTGAAGACCACCAGTGGCGAAGGCGGTCTACCAGAACACGTTCGACGGTGAGGGATGAAAGCTGGGGGAGCAAACCGGATTAGATACCCGGGTAGTCCCAGCTGTAAACGATGCAGACTCGGTGATGCCCTGGCTCGTGGCCAGTGCAGTGCCGCAGGGAAGCCGTTAAGTTTGCCGCCTGGGAAGTAAGTACGCAAGTATGAAACTTAAAGGAATTGGCGGGGGAGCACCAACAAGGGGTGAAGCCTGCGGTTCAATTGGAGTCAACGCCAGAAATCTTACCCGAGGAGACAGCAGAATGAAGGTCAAGCTGGAGACTTTACCAGACAAGCTGAGAAGTGGTGCATGGCCGTCGCCAGCTCGTGCCGTGAGATGTCCTGTTAAGTCAGGTAACGAGCGAGATCCCTGCCTCTAGTTGCCACCATTACTCTCAGGAGTAGTGGGGCGAATTAGCGGGACCGCCGCAGTTAATGCGGAGGAAGGAAGGGGCCACGGCAGGTCAGTATGCCCTGAAACTTTGGGGCCACACGCGGGCTGCAATGATAGTGACAATGAGTTCCTAAACCGAAAGGTGGAGGCAATCTTCAAACGCTATCACAGTTATGATTGAGGGCTGCAACTCGCCCTCATGAATATGGAATCCCTAGTAACTGCGTGTCATTACCGCGCGGTGAATACGTCCCTGCTCCTTGCACACACCGCCCGTC',
//     }
//   })
//   .then(response => {
//      console.log(response);
//      console.log(response.data);
//   }).catch(error => {
//      console.log(error);
//   })

//// Search by family

axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/species/', {
    params: {
      family: 'Lachnospiraceae',
    }
  })
  .then(response => {
     console.log(response);
     console.log(response.data);
  }).catch(error => {
     console.log(error);
  })

//// Get sequence alignment gg_id's

// axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/alignment/', {
//     params: {
//       gg_id_1: 14,
//       gg_id_2: 14
//     }
//   })
//   .then(response => {
//     console.log(response);
//     console.log(response.data);
//   }).catch(error => {
//     console.log(error);
//   })

//// Get publication from gg_id

// axios.get('http://fa17-cs411-48.cs.illinois.edu:8080/publication/', {
//     params: {
//       gg_id: 14
//     }
//   })
//   .then(response => {
//     console.log(response);
//     console.log(response.data);
//   }).catch(error => {
//     console.log(error);
//   })

//// Delete sequence using gg_id

// axios.delete('http://fa17-cs411-48.cs.illinois.edu:8080/sequence/10', {
//  })
//  .then(response => {
//    console.log(response);
//  }).catch(error => {
//    console.log(error);
//  })

//// Insert a sequence

// axios.post('http://fa17-cs411-48.cs.illinois.edu:8080/sequence', {
//    gg_id: 10,
//    strain: 'asdf',
//    primary_accession: 'asdf',
//    decision: 'asdf',
//    isolation_source: 'asdf',
//    common_name: 'asdf',
//    sequence: 'asdf',
//  })
//  .then(response => {
//    console.log(response);
//  }).catch(error => {
//    console.log(error);
//  })

//// Update a sequence

//axios.patch('http://fa17-cs411-48.cs.illinois.edu:8080/sequence', {
//    gg_id: 10,
//    common_name: 'Matt',
//    strain: 'Human',
//    sequence: 'fdsa'
//  })
//  .then(response => {
//    console.log(response);
//  }).catch(error => {
//    console.log(error);
//  })

