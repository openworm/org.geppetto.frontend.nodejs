var express = require('express');
//var Engine = require("velocity").Engine;
var velocity = require("velocity.java");
var app = express();
var expressWs = require('express-ws')(app)

// Redirection for static content
app.use('/geppetto', express.static('geppetto/src/main/webapp/'));

// Web handler
app.get('/', function (req, res) {
	velocity.renderOnce("geppetto.vm", {}, "geppetto/src/main/webapp/templates/dist/", function(err, data) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    res.send(data.toString());
	});

});

// Creating web socket
app.ws('/org.geppetto.frontend/GeppettoServlet', function(ws, req) {
	ws.on('message', function(msg) {
		var msgParsed = JSON.parse(msg);
		if (msgParsed['type'] == 'geppetto_version'){
			//Where do we get the geppetto version from?
			console.log("Geppetto Version...")
			ws.send(JSON.stringify({"requestID":msgParsed['requestID'],"type":"geppetto_version","data":"{\"geppetto_version\":\"0.3.6\"}"}));
		}
	
	});

	console.log("Opening ws...")
	ws.send(JSON.stringify({"type":"client_id","data":"{\"clientID\":\"Connection161\"}"}));
	
});

// Creating server
app.listen(8080, function () {
  console.log('Geppetto listening on port 8080!');
});





  
  
 
