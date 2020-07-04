const http = require('http')
const fs = require('fs')
const url = require("url")
const path = require("path")

http.createServer(function (req, res) {
	console.log(req.headers['user-agent'], req.connection.remoteAddress)
	let uri = url.parse(req.url).pathname
	let filename = path.join(process.cwd(), path.normalize(uri).replace(/^(\.\.(\/|\\|$))+/, ''))
	if (fs.existsSync(filename) && !fs.lstatSync(filename).isDirectory()) {
		res.writeHead(200)
		res.write(fs.readFileSync(filename))
	}else{
		res.writeHead(404)
		res.write("err: 404")
	}
	res.end()
}).listen(30001)
