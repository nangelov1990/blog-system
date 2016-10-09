'use strict'
let url = require('url')
let fs = require('fs')

let pageGen = require('../helpers/pageTemplGenerator')
let responsesHelper = require('../helpers/responses').responses
let responseType = require('../helpers/responses').types

let homePageHtml = './content/partials/index.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/' &&
      req.method === 'GET') {
    fs.readFile(homePageHtml, 'utf8', (err, data) => {
      if (err) console.error(err)

      // TODO: handle responses

      let pageHeading = 'The NANGELOV BLOG Home'
      let pageTemplate = pageGen(data)
      let pageContent = '' // TODO: Display top 6 articles, based on views

      let html = pageTemplate.pageHeader +
        pageHeading +
        pageTemplate.pageMenu +
        pageContent +
        pageTemplate.pageFooter

      responsesHelper.ok(res, html, responseType.html)
    })
  } else {
    return true // handler cannot support request
  }
}
