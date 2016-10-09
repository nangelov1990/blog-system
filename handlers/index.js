'use strict'
module.exports.db = require('../content/mock-db')

let favicon = require('./favicon')
let homePage = require('./home-page')
let createPage = require('./create')
let listAll = require('./list-all')

module.exports.handlers = [
  favicon,
  homePage,
  createPage,
  listAll
]
