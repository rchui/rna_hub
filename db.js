var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser')
var app = express();

app.use(cors());                    // to enable cross site resources
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Define database connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ncsa",
  database: "rRNAHUB2"
});
//test

// Connect to database.
connection.connect(function(err) {
  if (err) {
    console.log(err);
    res.statusCode = 500;
    return res.json({ errors: ['Could not connect to database.'] });
  }
});


/////////////////////////
//// SEQUENCE ROUTER ////
/////////////////////////

var sequenceRouter = express.Router();

function getSequence(req, res, next) {
  // req.params.num passed through url
  var sql = 'SELECT * FROM rRNA_Sample WHERE GG_ID = ' + req.query.gg_id;

  // Query database
  connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not retrieve sequences.'] });
    }

    console.log(sql);

    req.sequence = results;
    next();
  });
}

function postSequence(req, res, next) {
  var sql = "INSERT INTO rRNA_Sample (GG_ID, Strain, Primary_accession, Decision, Isolation_source, Common_name, Sequence) VALUES ("
    + "'" + req.body.gg_id + "', "
    + "'" + req.body.strain + "', "
    + "'" + req.body.primary_accession + "', "
    + "'" + req.body.decision + "', "
    + "'" + req.body.isolation_source + "', "
    + "'" + req.body.common_name + "', "
    + "'" + req.body.sequence + "')";

  connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not add sequence.'] });
    }

    console.log(sql);

    req.message = { message: 'Success' };
    next();
  });
}

function deleteSequence(req, res, next) {
  var sql = 'DELETE FROM rRNA_Sample WHERE GG_ID = ' + req.params.gg_id;

  connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not update sequence.'] });
    }

    console.log(sql);

    req.message = { message: 'Success'};
    next();
  });
}

function patchSequence(req, res, next) {
  var sql = "UPDATE rRNA_Sample SET ";
  if (req.body.common_name != null) {
    sql += "Common_name = '" + req.body.common_name + "', ";
  }
  if (req.body.strain != null) {
    sql += "Strain = '" + req.body.strain + "', ";
  }
  if (req.body.sequence != null) {
    sql += "Sequence = '" + req.body.sequence + "' ";
  }
  sql += "WHERE GG_ID = " + req.body.gg_id;

  connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not update sequence.'] });
    }

    console.log(sql);

    req.message = { message: 'Success'};
    next();
  })
}

// Handle get request with getSequence()
sequenceRouter.get('/', getSequence, function(req, res) {
  // Return results as json response
  res.json(req.sequence);
});

sequenceRouter.post('/', postSequence, function(req, res) {
  res.json(req.message);
});

sequenceRouter.patch('/', patchSequence, function(req, res) {
  res.json(req.message);
});

sequenceRouter.delete('/:gg_id', deleteSequence, function(req, res) {
  res.json(req.message);
});

// Register app
app.use('/sequence', sequenceRouter);

////////////////////////////
//// PUBLICATION ROUTER ////
////////////////////////////

var publicationRouter = express.Router();

function getPublication(req, res, next) {
  var acc_sql = 'SELECT * FROM rRNA_Sample WHERE GG_ID = ' + req.query.gg_id;

  connection.query(acc_sql, function(acc_err, acc_results, acc_fields) {
    if (acc_err) {
      console.log(acc_err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not retrieve sequences.'] });
    }

    console.log(acc_sql);
    var primary_accession = (acc_results[0].Primary_accession);
    var pub_sql = 'SELECT * FROM PUBLICATIONS WHERE Accession = "' + primary_accession + '"';

    connection.query(pub_sql, function(pub_err, pub_results, pub_fields) {
      if (pub_err) {
        console.log(pub_err);
        res.statusCode = 500;
        return res.json({ errors: ['Could not retrieve publications.'] });
      }

      console.log(pub_sql);

      req.publication = pub_results;
      next();
    })
  });
}

publicationRouter.get('/', getPublication, function(req, res) {
  res.json(req.publication);
});

app.use('/publication', publicationRouter);

//////////////////////////
//// ALIGNMENT ROUTER ////
//////////////////////////

var alignmentRouter = express.Router();

function getAlignment(req, res, next) {
  var sql_1 = 'SELECT * FROM rRNA_Sample WHERE GG_ID = ' + req.query.gg_id_1;
  var sql_2 = 'SELECT * FROM rRNA_Sample WHERE GG_ID = ' + req.query.gg_id_2;

  connection.query(sql_1, function(err, results, fields) {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not retrieve sequences.'] });
    }

    console.log(sql_1);
    req.alignment_1 = results[0].Sequence;

    connection.query(sql_2, function(err, results, fields) {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        return res.json({ errors: ['Could not retrieve sequences.'] });
      }

      console.log(sql_2);

      req.alignment_2 = results[0].Sequence;
      
      req.alignment = align(req.alignment_1, req.alignment_2)
      next();
    });
  });
}

function align(seq1, seq2){
	var seq1_len = seq1.length;
	var seq2_len = seq2.length;


	//create multidimensional array
	//len of seq2 is outer array
	var outer_arr = new Array(seq2_len+1);
	//initiaze arrays of len seq1 in each element of outer_arr
	for (var i = 0; i < outer_arr.length; i++) {
        	outer_arr[i]= new Array(seq1_len+1)
	}

	//build the scoring matrix
	//scores
	var match=1
	var miss=-1
	var indel="-"


	
	outer_arr[0][0] = 0;
	
	//populate outer edges(top and left)
	for(var i=1;i<=seq2_len;i++) {
		outer_arr[i][0] = miss * i;
	}

	for(var i=1;i<=seq1_len;i++){
		outer_arr[0][i] = miss * i;
	}

	for(var i=1;i<=seq2_len;i++) {
    		for(var j=1;j<=seq1_len;j++) { //make into an if statement
        		if(seq2[i-1] === seq1[j-1]) {
                                var corner = outer_arr[i-1][j-1]+match
                        } else {
                                var corner = outer_arr[i-1][j-1]+miss
                        }

			outer_arr[i][j] = Math.max(
            		outer_arr[i-1][j] + miss,
			corner,
            		outer_arr[i][j-1] + miss
        		);
    		}
	}

	//traverse backwards and build sequences in reverse
	var i = seq2_len;
	var j = seq1_len;
	var new_seq1 = [];
	var new_seq2 = [];

	do {
		var up = outer_arr[i-1][j];
    		var diag = outer_arr[i-1][j-1];
    		var left = outer_arr[i][j-1];
    		var max = Math.max(up, diag, left);
		
		if (max===up){
			i--;
			new_seq1.push(indel);
			new_seq2.push(seq2[i]);

		} else if (max===diag) {
			j--;
			i--;
			new_seq1.push(seq1[j]);
			new_seq2.push(seq2[i]);

		} else { //max=left
			j--;
			new_seq1.push(seq1[j]);
			new_seq2.push(indel);
		}


	} while(i>0 && j>0);


	return [new_seq1.reverse(), new_seq2.reverse()] ;
}


alignmentRouter.get('/', getAlignment, function(req, res) {
  res.json(req.alignment);
});

app.use('/alignment', alignmentRouter);


////////////////////////
//// SPECIES ROUTER ////
////////////////////////

var speciesRouter = express.Router();

function getFromSpecies(req, res, next) {
  // req.params.num passed through url
  var sql = 'SELECT R.GG_ID, R.Strain, R.Primary_accession, R.Decision, R.Isolation_source, R.Common_name, R.Sequence FROM rRNA_Sample R, TAXONOMY T WHERE R.GG_ID = T.GG_ID AND T.Family = "' + req.query.family + '"';

  // Query database
  connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not retrieve sequences.'] });
    }

    console.log(sql);

    req.sequences = results;
    next();
  });
}

speciesRouter.get('/', getFromSpecies, function(req, res) {
  res.json(req.sequences);
});

app.use('/species', speciesRouter);

/////////////////////////////
//// FROMSEQUENCE ROUTER ////
/////////////////////////////

var fromSequenceRouter = express.Router();

function getFromSequence(req, res, next) {
  // req.params.num passed through url
  var sql = 'SELECT * FROM rRNA_Sample WHERE Sequence = "' + req.query.sequence + '"';

  // Query database
  connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json({ errors: ['Could not retrieve sequences.'] });
    }

    console.log(sql);
    // console.log(results);

    req.sequences = results;
    next();
  });
}

fromSequenceRouter.get('/', getFromSequence, function(req, res) {
  res.json(req.sequences);
});

app.use('/fromSequence', fromSequenceRouter);

// Listen to port 8080
app.listen(8080);
module.exports = app;
