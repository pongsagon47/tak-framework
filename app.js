const http = require('http')
const { handleFiles, handleAPIs } = require('./backendConfig/handle')

http.createServer((req, res) => {
  if(req.url.startsWith('/api/')) {
    handleAPIs(req, res)
  } else {
    handleFiles(req, res)
  }
}).listen(2222, () => { console.log('lisning to port 2222') })