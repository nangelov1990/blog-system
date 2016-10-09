'use strict'
let url = require('url')
let fs = require('fs')
let multiparty = require('multiparty')

let pageGen = require('../helpers/pageTemplGenerator')
let responsesHelper = require('../helpers/responses').responses
let responseType = require('../helpers/responses').types

let articles = require('../content/db')

let article = require('../helpers/articleObj').articleObject
let articleCounter = require('../helpers/articleObj').articleCounter

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
    } else if (req.method === createPagePost) {
      let title = ''
      let desc = ''
      let filename = ''

      let form = new multiparty.Form()
      form.parse(req)
      form.on('part', (part) => {
        if (part.filename) {
          let file = ''
          part.setEncoding = 'binary'
          part.on('data', (data) => { file += data })
          part.on('end', () => {
            fs.writeFile(`./images/${part.filename}`, file) // TODO: handle clashing filenames
            filename = part.filename
          })
        } else {
          let body = ''

          part.setEncoding('utf8')
          part.on('data', (data) => {
            console.log(data)
            body += data
          })
          part.on('end', () => {
            if (part.name === 'title') {
              title = body
            } else {
              desc = body
            }
          })
        }
      })
      form.on('close', () => {
        article.title = title
        article.description = desc
        article.imageName = filename

        articles.push(article)
        console.log(articleCounter)
        articleCounter++
        console.log(articles)
        console.log(articleCounter)

        let createdMessage = '<h2>Article added</h2>'
        let html = pageTemplate.header +
          pageHeading +
          pageTemplate.menu +
          createdMessage +
          pageTemplate.footer
        
        responsesHelper.ok(res, html, responseType.html)
      })
    }
  } else {
    return true // handler does not support request
  }
}
