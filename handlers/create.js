'use strict'
let url = require('url')
let fs = require('fs')

let pageGen = require('../helpers/pageTemplGenerator')
let responsesHelper = require('../helpers/responses').responses
let responseType = require('../helpers/responses').types

let homePageHtml = './content/partials/index.html'
let createPageHtml = './content/partials/create.html'

let createPageUrl = '/create'
let createPageGet = 'GET'
let createPagePost = 'POST'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === createPageUrl) {
    let pageHeading = 'Add new article'
    let pageTemplate = pageGen(fs.readFileSync(homePageHtml, 'utf8'))

    if (req.method === createPageGet) {
      let createForm = fs.readFileSync(createPageHtml, 'utf8')

      let html = pageTemplate.header +
        pageHeading +
        pageTemplate.menu +
        createForm +
        pageTemplate.footer

      responsesHelper.ok(res, html, responseType.html)
    }
  } else {
    return true // handler does not support request
  }
}
