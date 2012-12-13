var qs = require('querystring');
var url = require('url');
var dataUtils = require('./dataUtils');

var args = process.argv.slice(2);

var port = args[0] || 3000;
//throw an error? nah - just ignore
if(isNaN(port)) port=3000;


require('http').createServer(function(req, res) {

	var dataReq = qs.parse(url.parse(req.url).query);
	//console.log("dataReq",dataReq);

	//Did they specify how many they want?
	if(!dataReq.num) dataReq.num = 10;

	if(typeof dataReq.num == "string" && dataReq.num.indexOf(":") > 0) {
		var parts = dataReq.num.split(":");
		if(parts[0] != "rnd") {
			throw new Error("Invalid num prefix sent. Must be 'rnd'");
		}
		// format is rnd:10 which means, from 1 to 10
		if(parts.length === 2) {
			dataReq.num = dataUtils.randRange(1,parts[1]);
		} else {
			dataReq.num = dataUtils.randRange(parts[1],parts[2]);
		}
	}

	/* for my testing...
	var fieldModel = [
		{name:"name"},
		{name:"fname"},
		{name:"lname"},
		{name:"age"},
		{name:"all_age"},
		{name:"email"},
		{name:"ssn"},
		{name:"tel"},
		{name:"goo",type:"lname"},
		{name:"num"},
		{name:"upto20",type:"num:20"},
		{name:"20to30",type:"num:20:30"}
	];
	*/

	var fieldModel = [];
	for(key in dataReq) {
		if(key != "num") {
			fieldModel.push({name:key,type:dataReq[key]});
		}
	}

	var result = [];
	for(var i=0; i<dataReq.num; i++) {
		result.push(dataUtils.generateNewItem(fieldModel));
	}

	res.writeHead(200, {'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
	res.end(JSON.stringify(result));


}).listen(port);

console.log("Listening on "+port);