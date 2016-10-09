'use strict'
module.exports.commentObject = comment
function comment (username, text) {
  this.username = username
  this.text = text
  this.dateCreated = new Date().toLocaleString()
}
