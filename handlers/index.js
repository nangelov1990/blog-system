'use strict'
module.exports.db = require('../content/db')

let favicon = require('./favicon')
let homePage = require('./home-page')

module.exports.handlers = [
  favicon,
  homePage
]
