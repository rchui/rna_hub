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

// Handle get request with getSequence()
sequenceRouter.get('/', getSequence, function(req, res) {
  // Return results as json response
  res.json(req.sequence);
});

sequenceRouter.post('/', postSequence, function(req, res) {
  res.json(req.message);
});

sequenceRouter.patch('/', function(req, res) {

});

sequenceRouter.delete('/:gg_id', deleteSequence, function(req, res) {
  res.json(req.message);
});

// Register app
app.use('/sequence', sequenceRouter);
// Listen to port 8080
app.listen(8080);
module.exports = app;
