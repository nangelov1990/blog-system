'use strict'
let coutner = 0
module.exports.articleCounter = coutner
module.exports.articleObject = {
  'id': coutner,
  'title': '',
  'description': '',
  'totalViews': 0,
  'comments': [],
  'imageName': '',
  'dateCreated': new Date().toLocaleString()
}
