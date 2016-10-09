'use strict'
module.exports.types = {
  'html': 'text/html',
  'favicon': 'image/x-icon'
}

module.exports.responses = {
  ok,
  notFound,
  redirected
}

function ok (res, data, type) {
  plain(res, data, type, 200)
}

function notFound (res, data, type, err) {
  console.error(err)
  plain(res, data, type, 404)
}

function redirected (res, data, type, locationHeader) {
  plain(res, data, type, 302, locationHeader)
}

function plain (res, data, type, code, additionalHeaders) {
  let headers = {
    'Connection': 'keep-alive',
    'Accept': '*/*'
  }
  data ? headers['Content-Length'] = data.length : null
  type ? headers['Content-Type'] = type : null
  additionalHeaders
    ? additionalHeaders.forEach((header) => {
      headers[header] = additionalHeaders.header
    })
    : null

  res.writeHead(code, headers)
  data ? res.write(data) : null
  res.end()
}
