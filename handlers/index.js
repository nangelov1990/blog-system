'use strict'
module.exports.db = require('../content/db')

let homePage = require('./home-page')

module.exports.handlers = [
  homePage
]
