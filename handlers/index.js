'use strict'
// module.exports.db = require('../content/db')
module.exports.db = require('../content/mock-db')

let favicon = require('./favicon')
let homePage = require('./home-page')
let createPage = require('./create')
let listAll = require('./list-all')
let details = require('./details')
let postComment = require('./post-comment')
let staticFiles = require('./static-files')
let stats = require('./stats')

module.exports.handlers = [
  favicon,
  homePage,
  createPage,
  listAll,
  postComment,
  details,
  stats,
  staticFiles
]
