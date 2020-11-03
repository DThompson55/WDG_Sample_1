/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
//var cfenv = require('cfenv');

var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var bodyParser = require("body-parser");
//create a new express server
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
var fs = require('fs');
var uniqueFilename = require('unique-filename');
var zipVerify = require('./uspsverify/services.js');

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
//var appEnv = cfenv.getAppEnv();
var uploadsToday = 0;

zipVerify.init(app);

//---------------------------------------------------------------------
app.post('/formaction', function (req, res) {
//	console.log("Form Action")
	var answer = {};
	answer.cnum = req.body.cnum;
	answer.fnam = req.body.fnam;
	answer.lnam = req.body.lnam;
	answer.street = req.body.street;
	answer.city = req.body.city;
	answer.state = req.body.state;
	answer.zip = req.body.zip;
	answer.email = req.body.email;
	answer.phone = req.body.phone;
	answer.twitter = req.body.twitter;
	answer.notes = req.body.notes;
//	console.log(answer);
	uploadsToday ++;
	if (req.body.cnum == '549'){
		uploadsToday --;
		res.send("Error, Duplicate Customer ID ");			
	}else{
	if ( uploadsToday === 1){
		res.send("Approved\n"+uploadsToday+" Entry uploaded today");
	} else {		
		res.send("Approved\n"+uploadsToday+" Entries uploaded today");
	}}
});


// start server on the specified port and binding host
app.listen(6006, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + "http://localhost:6006/");
});
