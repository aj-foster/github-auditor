let fs = require('fs')

exports.getToken = function () {
  const fileContents = fs.readFileSync('token.secret', 'utf8')

  if (typeof fileContents !== 'string')
    throw 'Could not read file token.secret'

  const token = fileContents.trim()

  if (token.length !== 40)
    throw 'Unexpected Personal Access Token length (!= 40 characters)'

  global.token = token
}
