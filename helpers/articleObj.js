'use strict'
module.exports.articleObject = article
function article (id, title, description, imageName) {
  this.id = id
  this.title = title
  this.description = description
  this.views = 0
  this.comments = []
  this.imageName = imageName
  this.deleted = false
  this.dateCreated = new Date().toLocaleString()
}
