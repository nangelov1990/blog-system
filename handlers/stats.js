'use strict'
let url = require('url')
let fs = require('fs')

let pageGen = require('../helpers/pageTemplGenerator')
let responsesHelper = require('../helpers/responses').responses
let responseType = require('../helpers/responses').types

let articles = require('./index').db

let homePageHtml = './content/partials/index.html'
let statsPageHtml = './content/partials/list-all.html'

let statsPageUrl = '/stats'
let statsPageMethod = 'GET'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === statsPageUrl &&
      req.method === statsPageMethod) {
    let pageTemplate = pageGen(fs.readFileSync(homePageHtml, 'utf8'))
    let html = ''

    let adminHeader = req.headers['my-authorization'] === 'Admin'
    if (adminHeader) {
      let pageHeading = 'Stats page'
      if (articles.length > 0) {
        let totalViews = 0
        articles.forEach((article) => { totalViews += article.views })
        let totalArticlesHtml = `<span>Total number of articles: ${articles.length}</span><br />`
        let totalViewsHtml = `<span>Total number of views: ${totalViews}</span><br />`
        let statsViewHtml = totalArticlesHtml + totalViewsHtml + '<h3>All articles</h3>'

        let articleAllView = fs.readFileSync(statsPageHtml, 'utf8').split('#')
        // article list view
        let articleListTop = articleAllView[0]
        let articleListBottom = articleAllView[5]
        let articleList = ''
        // single article view
        let articleStart = articleAllView[1]
        let articleAfterId = articleAllView[2]
        let articleAfterTitle = articleAllView[3]
        let articleEnd = articleAllView[4]

        let filteredSortedArticles = articles
          .sort((a, b) => {
            return new Date(b.dateCreated) - new Date(a.dateCreated)
          })

        filteredSortedArticles.forEach((article) => {
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
          statsViewHtml +
          allArticlesView +
          pageTemplate.footer

        responsesHelper.ok(res, html, responseType.html)
      } else {
        let noArticlesMessage = '<h2>No articles yet.</h2>'
        html = pageTemplate.header +
          pageHeading +
          pageTemplate.menu +
          noArticlesMessage +
          pageTemplate.footer

        responsesHelper.notFound(res, html, responseType.html)
      }
    } else {
      let pageHeading = 'Page not found'
      let notFoundErrorMessage = '<h2>ERROR 404</2>'

      html = pageTemplate.header +
        pageHeading +
        pageTemplate.menu +
        notFoundErrorMessage +
        pageTemplate.footer

      responsesHelper.notFound(res, html, responseType.html)
    }
  } else {
    return true
  }
}
