'use strict'
let url = require('url')
let fs = require('fs')

let responsesHelper = require('../helpers/responses').responses
let responseType = require('../helpers/responses').types

let favicon = './content/favicon.ico'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/favicon.ico') {
    fs.readFile(favicon, (err, data) => {
      if (err) console.error(err)

      responsesHelper.ok(res, data, responseType.favicon)
    })
  } else {
    return true // handler does not support request
  }
}
