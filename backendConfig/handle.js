const path = require('path')
const fs = require('fs')
const moment = require('moment')

function getPage(page) {
  const filePath = path.join(__dirname, `../${page}`)
  return fs.readFileSync(filePath)
}

function handleFiles(req, res) {
  const fileType = path.extname(req.url) || '.html'

  if(fileType === '.html') {
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200)
    if(req.url === '/') {
      res.write(getPage('views/index.html'))
    } else {
      res.write(getPage(`views/${req.url}.html`))
    }
    res.end()
  }
  else if(fileType === '.css') {
    const filePath = path.join(__dirname, `../public/${req.url}`)
    try {
      fs.readFileSync(filePath)
      res.setHeader('Content-Type', 'text/css')
      res.writeHead(200)
      res.write(getPage(`public/${req.url}`))
      res.end()
    } catch(error) {
      if(error.code === 'ENOENT') {
        res.writeHead(404)
        res.end()
      }
    }
  }
  else if(fileType === '.js') {
    const filePath = path.join(__dirname, `../public/${req.url}`)
    try {
      fs.readFileSync(filePath)
      res.setHeader('Content-Type', 'text/js')
      res.writeHead(200)
      res.write(getPage(`public/${req.url}`))
      res.end()
    } catch(error) {
      if(error.code === 'ENOENT') {
        res.writeHead(404)
        res.end()
      }
    }
  }
  else if(fileType === '.png') {
    const filePath = path.join(__dirname, `../${req.url}`)
    try {
      fs.readFileSync(filePath)
      res.writeHead(200)
      res.write(getPage(`${req.url}`))
      res.end()
    } catch(error) {
      if(error.code === 'ENOENT') {
        res.writeHead(404)
        res.end()
      }
    }
  }
  else if(fileType === '.jpg') {
    const filePath = path.join(__dirname, `../${req.url}`)
    try {
      fs.readFileSync(filePath)
      res.writeHead(200)
      res.write(getPage(`${req.url}`))
      res.end()
    } catch(error) {
      if(error.code === 'ENOENT') {
        res.writeHead(404)
        res.end()
      }
    }
  }
  else {
    res.writeHead(404)
    res.end()
  }
}

function getData(url) {
  let data
  if(url === '/api/users') {
    data = [{ name: 'tak' }, { name: 'Ya' }]
  } else if(url === '/api/posts') {
    data = [
      {
        title: 'A',
        pubilsDate: moment().startOf('day').fromNow()
      },
      {
        title: 'A',
        pubilsDate: moment().set('month', 1).startOf('day').fromNow()
      }
    ]
  }
  return data
}

function handleAPIs(req, res) {
  let data = getData(req.url)
  if(data) {
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify(data))
  } else {
    res.writeHead(404)
  }
  res.end()
}
module.exports = {
  handleFiles,
  handleAPIs
}