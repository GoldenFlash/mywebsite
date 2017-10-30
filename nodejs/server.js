let http = require('http');
let url = require('url');
let fs = require('fs');
let server = http.createServer((req,res)=>{

	// res.statusCode = 200;
	// res.setHeader("Content-Type","text/plain; chartset=utf-8");

	var pathname = url.parse(req.url).pathname;
	fs.readFile(pathname.substring(1),(erro,data)=>{
		if(erro){
			res.writeHeader(404,{
				'content-Type':'text/html'
			});
			return
		}else{
			res.writeHeader(200,{
				'content-Type':'text/html'
			});
		}
		res.write(data.toString());
		res.end();
	});
	
	
});
server.listen(3000,'127.0.0.1', ()=>{
	console.log(1)
})
