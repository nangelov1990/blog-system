'use strict'
let http = require('http')

let port = process.env.PORT || 2993

let handlers = require('./handlers/index').handlers

http
  .createServer((req, res) => {
    for (let handler of handlers) {
      let next = handler(req, res)
      if (!next) break
    }
  })
  .listen(port)

console.log(`Server listening ot port ${port}...`)
