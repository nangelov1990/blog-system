'use strict'
let url = require('url')
let fs = require('fs')

let pageGen = require('../helpers/pageTemplGenerator')
let responsesHelper = require('../helpers/responses').responses
let responseType = require('../helpers/responses').types

let articles = require('./index').db

let homePageHtml = './content/partials/index.html'
let listAllPageHtml = './content/partials/list-all.html'

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
      let html = ''

      if (articles.length > 0) {
        let articleAllView = fs.readFileSync(listAllPageHtml, 'utf8').split('#')
        // article list view
        let articleListTop = articleAllView[0]
        let articleListBottom = articleAllView[5]
        let articleList = ''
        // single article view
        let articleStart = articleAllView[1]
        let articleAfterId = articleAllView[2]
        let articleAfterTitle = articleAllView[3]
        let articleEnd = articleAllView[4]

        let sortedArticles = articles
          .filter((article) => { return article.deleted === false })
          .sort((a, b) => {
            return new Date(a.views) - new Date(b.views)
          })
        sortedArticles.forEach((article) => {
          articleList += articleStart +
            article.id +
            articleAfterId +
            article.title +
            articleAfterTitle +
            article.dateCreated +
            articleEnd
        })

        let allArticlesView = articleListTop +
          articleList +
          articleListBottom

        html = pageTemplate.header +
          pageHeading +
          pageTemplate.menu +
          allArticlesView +
          pageTemplate.footer
      } else {
        let noArticlesMessage = '<h2>No articles yet.</h2>'
        html = pageTemplate.header +
        pageHeading +
        pageTemplate.menu +
        noArticlesMessage +
        pageTemplate.footer
      }

      responsesHelper.ok(res, html, responseType.html)
    })
  } else {
    return true // handler cannot support request
  }
}
