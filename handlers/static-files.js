'use strict'
let fs = require('fs')
let url = require('url')

let pageGen = require('../helpers/pageTemplGenerator')
let responsesHelper = require('../helpers/responses').responses
let responseType = require('../helpers/responses').types

let homePageHtml = './content/partials/index.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (!req.pathname.startsWith('/images')) {
    console.error(`Forbidden resource, url: ${req.pathname}`)

    let html = genPage('FORBIDDEN')

    responsesHelper.forbidden(res, html, responseType.html)

    return true
  }

  let filepath = '.' + req.pathname

  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.error(err)

      let html = genPage('File not found')

      responsesHelper.notFound(res, html, responseType.html)

      return true // handler does not support request
    }

    let contentType = getContentType(filepath)

    if (!contentType) {
      console.error('Non-supported file format requested.')

      let html = genPage('UNSUPPORTED MEDIA TYPE')

      responsesHelper.unsupported(res, html, responseType.html)

      return true
    }

    responsesHelper.ok(res, data, contentType)
  })
}

function genPage (pageContent) {
  let data = fs.readFileSync(homePageHtml, 'utf8')
  let pageHeading = 'Home'
  let pageTemplate = pageGen(data)
  let html = pageTemplate.header +
      pageHeading +
      pageTemplate.menu +
      pageContent +
      pageTemplate.footer

  return html
}

function getContentType (filepath) {
  let contentType

  if (filepath.endsWith('.css')) {
    contentType = 'text/css'
  } else if (filepath.endsWith('.js')) {
    contentType = 'application/javascript'
  } else if (filepath.endsWith('.html')) {
    contentType = 'text/html'
  } else if (filepath.endsWith('.jpg')) {
    contentType = 'image/jpg'
  }

  return contentType
}
