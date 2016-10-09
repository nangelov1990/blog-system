'use strict'

module.exports = (data) => {
  let pageHtml = data.split('#')

  let pageHeader = pageHtml[0]
  let pageMenu = pageHtml[1]
  let pageFooter = pageHtml[2]

  return {
    pageHeader,
    pageMenu,
    pageFooter
  }
}
