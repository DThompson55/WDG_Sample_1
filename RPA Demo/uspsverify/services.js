var verify = require('./verify.js').verifyAddress;

// https://app.swaggerhub.com/apis/dataday/uspsVerify/1.0.0#/verify/verify
// sample http://localhost:3000/verify?addr={%22Address1%22:%223114%20Church%22,%22Address2%22:%22%22,%22City%22:%22Evanston%22,%22State%22:%20%22IL%22,%22ZIP%22:%22%22}
function init(app){
app.post("/zipverify", function(req, res) {
	console.log("Entering services")
	addr = req.body;
	verify(addr, function (address) {
  		    var verified = (JSON.parse(JSON.stringify(address).replace(/^................/g, '{')));
  		    verified.ok = false;
  		    if ( verified.Zip5 === addr.Zip5){
  		    	verified.ok = true;	
  		    }
			res.status(200).send(verified);
	});
});
}

module.exports = {
		init:  init
	};