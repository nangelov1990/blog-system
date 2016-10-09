'use strict'
var url = require('url')
var fs = require('fs')

let pageGen = require('../helpers/pageTemplGenerator')
let responsesHelper = require('../helpers/responses').responses
let responseType = require('../helpers/responses').types

let articles = require('./index').db

let homePageHtml = './content/partials/index.html'
let detailsPageHtml = './content/partials/details.html'

let detailsPageUrl = '/details'
let detailsPagePost = 'POST'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith(detailsPageUrl)) {
    let urlSplit = req.pathname.split('/')
    let index = parseInt(urlSplit[urlSplit.length - 1])
    let itemPos = articles.map((x) => x.id).indexOf(index)
    let article = articles[itemPos]

    let pageHeading = 'Article details'
    let pageTemplate = pageGen(fs.readFileSync(homePageHtml, 'utf8'))
    let html = ''

    if (article) {
      ++article.views
      let detailsView = fs.readFileSync(detailsPageHtml, 'utf8').split('#')
      // article view
      let detailsTop = detailsView[0]
      let afterTitle = detailsView[1]
      let afterDesc = detailsView[2]
      let afterViews = detailsView[3]
      // article image
      let articleImage = detailsView[4]
      // buttons
      let deleteBtn = detailsView[5]
      let restoreBtn = detailsView[6]
      // comment section
      let leaveCommentsTop = detailsView[7]
      let leaveCommentsBottom = detailsView[8]

      let articleDetails = detailsTop +
        article.title +
        afterTitle +
        article.description +
        afterDesc +
        article.views +
        afterViews

      if (article.imageName !== '') {
        let splitImageTag = articleImage.split('?')
        let imageTop = splitImageTag[0]
        let imageBottom = splitImageTag[1]

        articleDetails += imageTop +
          article.imageName +
          imageBottom
      }

      if (req.method === detailsPagePost) {
        article.deleted
          ? article.deleted = false
          : article.deleted = true
      }

      article.deleted
        ? articleDetails += restoreBtn
        : articleDetails += deleteBtn

      articleDetails += leaveCommentsTop +
        article.id +
        leaveCommentsBottom

      if (article.comments.length > 0) {
        articleDetails += '<h3>Comments</h3><ul>'
        article.comments.forEach((comment) => {
          articleDetails += `<li><ul>
            <li>USER: <span>${comment.username}</span></li>
            <li>COMMENT: <span>${comment.text}</span></li>
          </ul></li>`
        })
        articleDetails += '</ul>'
      }

      html = pageTemplate.header +
        pageHeading +
        pageTemplate.menu +
        articleDetails +
        pageTemplate.footer

      responsesHelper.ok(res, html, responseType.html)
    } else {
      let noaArticleErrorMessage = '<h2>No such article</h2>'
      html = pageTemplate.header +
        pageHeading +
        pageTemplate.menu +
        noaArticleErrorMessage +
        pageTemplate.footer

      responsesHelper.notFound(res, html, responseType.html)
    }
  } else {
    return true // handler does not support request
  }
}
