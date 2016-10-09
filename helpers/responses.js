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

function redirected (res, locationHeader) {
  plain(res, null, null, 302, locationHeader)
}

function plain (res, data, type, code, additionalHeaders) {
  let headers = {
    'Connection': 'keep-alive',
    'Accept': '*/*'
  }
  data ? headers['Content-Length'] = data.length : null
  type ? headers['Content-Type'] = type : null
  if (additionalHeaders) {
    for (let header in additionalHeaders) {
      headers[header] = additionalHeaders[header]
    }
  }

  res.writeHead(code, headers)
  data ? res.write(data) : null
  res.end()
}
