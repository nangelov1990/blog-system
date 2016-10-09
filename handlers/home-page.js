'use strict'
let url = require('url')
let fs = require('fs')

let pageGen = require('../helpers/pageTemplGenerator')
let responsesHelper = require('../helpers/responses').responses
let responseType = require('../helpers/responses').types

let homePageHtml = './content/partials/index.html'

let homePageUrl = '/'
let homePageMethod = 'GET'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === homePageUrl &&
      req.method === homePageMethod) {
    fs.readFile(homePageHtml, 'utf8', (err, data) => {
      if (err) console.error(err)

      let pageHeading = 'Home'
      let pageTemplate = pageGen(data)
      let pageContent = '' // TODO: Display top 6 articles, based on views

      let html = pageTemplate.header +
        pageHeading +
        pageTemplate.menu +
        pageContent +
        pageTemplate.footer

      responsesHelper.ok(res, html, responseType.html)
    })
  } else {
    return true // handler cannot support request
  }
}
