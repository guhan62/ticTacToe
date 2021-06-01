const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if(req.url=="/static/style.css") {
    res.writeHead(200, { 'content-type': 'text/css' })
    fs.createReadStream('./static/style.css').pipe(res)
  }
  else if(req.url=="/scripts/App.js") {
    res.writeHead(200)
    fs.createReadStream('./scripts/App.js').pipe(res)
  }
  else {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('index.html').pipe(res)
  }
})

server.listen(process.env.PORT || 3000)