'use strict'
let counter = 0
module.exports.articleCounter = counter
module.exports.articleObject = article
function article (title, description, imageName) {
  this.id = counter
  this.title = ''
  this.description = ''
  this.views = 0
  this.comments = []
  this.imageName = ''
  this.deleted = false
  this.dateCreated = new Date().toLocaleString()
}
