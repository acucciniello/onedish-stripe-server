var express = require('express');
var fs = require('fs');
var app = express();
var port = 3000;
var stripe = require("stripe")("sk_test_zE9vc1mbnwzMXm96DPrCgiJ2");
var bodyParser = require('body-parser');
var stripeToken;


app.use(bodyParser.json())

app.post('/', function(req, res){
	console.log('POST /');
	console.dir(req.body);
	stripeToken = req.body.stripeToken; 
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end('thanks');
});

stripe.plans.create({
	amount: 5,
	interval: "month",
	name: "OneDish Basic",
	currency: "usd",
	id: "basic"
})


stripe.customers.create({
	source:stripeToken, 
	plan: "basic", 
	email: "aaaatones16@gmail.com"
}, function(err, customer) {
	if(err){
		console.log("Unsuccessful Customer Add :(");
	} else {
		console.log("Successful Customer Add!");
	}
});


app.listen(port);
console.log("Listening at http://localhost:" + port);