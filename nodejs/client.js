 let http = require('http');
 let util = require('util');
 http.get("http://www.imooc.com/u/card",function(res){
 	let data ='';
 	res.on('data',function(chunk){
 		data+=chunk;
 	});
 	res.on('end',function(){
 		var result = JSON.parse(data);
 		console.log(util.inspect(result));
 	});
 });