'use strict'
module.exports.db = require('../content/db')

let favicon = require('./favicon')
let homePage = require('./home-page')
let createPage = require('./create')

module.exports.handlers = [
  favicon,
  homePage,
  createPage
]
