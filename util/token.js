let fs = require('fs')

/* Retrieve a token from tokens.secret.
 *
 * We expect the user has stored a personal access token in a file called
 * token.secret at the base of the application directory. This function loads
 * it into memory as `global.token` and does some primitive sanity checks.
 */
exports.getToken = function () {
  const fileContents = fs.readFileSync('token.secret', 'utf8')

  if (typeof fileContents !== 'string')
    throw 'Could not read file token.secret'

  const token = fileContents.trim()

  if (token.length !== 40)
    throw 'Unexpected Personal Access Token length (!= 40 characters)'

  global.token = token
}
