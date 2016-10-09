'use strict'
let url = require('url')
let query = require('querystring')

let responsesHelper = require('../helpers/responses').responses

let articles = require('./index').db

let Comment = require('../helpers/commentObj').commentObject

let postCommentUrlStart = '/details/'
let postCommentUrlEnd = '/comments'
let postCommentMethod = 'POST'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith(postCommentUrlStart) &&
      req.pathname.endsWith(postCommentUrlEnd) &&
      req.method === postCommentMethod) {
    let urlSplit = req.pathname.split('/')
    let index = parseInt(urlSplit[urlSplit.length - 2])
    let itemPos = articles.map((x) => x.id).indexOf(index)
    let article = articles[itemPos]

    if (article) {
      let body = ''

      req.on('data', (data) => { body += data })
      req.on('end', () => {
        let user = query.parse(body).user
        let text = query.parse(body).text

        if (user && text) {
          let newComment = new Comment(user, text)
          article.comments.push(newComment)

          let locationHeader = {
            'Location': `/details/${article.id}`
          }

          responsesHelper.redirected(res, locationHeader)
        }
      })
    }
  } else {
    return true // handler does not support request
  }
}
