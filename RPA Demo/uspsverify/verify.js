var js2xml = require('js2xmlparser');
var Client = require('node-rest-client').Client;
var client = new Client();

const USPSUserID = process.env.USPSUserID || "298GUINE6374";
if (process.env.USPSUserID == null){
	console.log("Please set process.env.USPSUserID to your USPS supplied USERID see: https://www.usps.com/business/web-tools-apis/welcome.htm for details");
}

function verify(address, callback){
	console.log("entering verify");
	var verifyObj = {
		"AddressValidateRequest": {"@":{"USERID":"298GUINE6374"},
	    "Address":{
	    	"@": {
            "ID": "0"
          },
	    "Address1": address.Address1,
	    "Address2": address.Address2,
	    "City": address.City,
	    "State": address.State,
	    "Zip5": address.ZIP,
	    "Zip4": ""	}}};
	
	console.log("V-address",address);
	console.log("V-OBJ",verifyObj);
	
var sXML = js2xml.parse("a", verifyObj).replace(/^.....................\n.../g, '').replace(/\n+ */g, '').replace(/....$/g, '');

client.get('http://production.shippingapis.com/ShippingAPITest.dll?API=Verify&XML='+sXML, 
		function(data){
	callback(data.AddressValidateResponse.Address);
});
}

/*
 * test code
 * 
var addr = {"Address1": "3614 Church",
"Address2": "",
"City": "Evanston",
"State": "IL",
"ZIP": ""};
verify(addr, function (address) {
    // parsed response body as js object
    console.log(address);
    // raw response
 //   console.log(response);
});
 */

module.exports = {
		verifyAddress:  verify
	};
