var express = require('express');
//var Engine = require("velocity").Engine;
var velocity = require("velocity.java");
//var path = require("path");

var app = express();

var expressWs = require('express-ws')(app)

//app.get('/', function (req, res) {
//	var engine = new Engine({
//	    template: "geppetto.vm",
//	    root: __dirname + "/webapp/templates/dist/"
//	  });
//	var result = engine.render({});
//	console.log("taka");
//	console.log(result);
//  res.send('Hello World!');
//});

//app.get('/', function (req, res) {
//	var engine = new Engine({
//	    template: "hello.vm",
//	    root: __dirname + "/webapp/templates/dist/"
//	  });
//	var result = engine.render({name: 'velocity'});
//	console.log("taka");
//	console.log(result);
//  res.send('Hello World!');
//});


app.use('/geppetto', express.static('geppetto'));

app.get('/', function (req, res) {
	velocity.renderOnce("geppetto.vm", {}, "geppetto/templates/dist/", function(err, data) {
	    if (err) {
	        console.error(err);
	        return;
	    }
	    //console.log(data.toString());
	    res.send(data.toString());
	});

});

app.ws('/org.geppetto.frontend/GeppettoServlet', function(ws, req) {
	  ws.on('message', function(msg) {
		var msgParsed = JSON.parse(msg);
		console.log("receiving msg...");
		console.log(msgParsed);
	    if (msgParsed['type'] == 'geppetto_version'){
	    	//Where do we get the geppetto version from?
	    	ws.send(JSON.stringify({"requestID":msgParsed['requestID'],"type":"geppetto_version","data":"{\"geppetto_version\":\"0.3.1\"}"}));
	    }
	    
	  });
//	  ws.on('open', function(msg) {
//	    console.log('opening');
//	  });
//	  ws.on('connection', function(msg) {
//		    console.log('connection');
//		    
//		  });
	  console.log("opening ws...")
	  ws.send(JSON.stringify({"type":"client_id","data":"{\"clientID\":\"Connection161\"}"}));
	  
	});





app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});





  
  
 