let audit = require('./lib/audit.js')
let token = require('./util/token.js')
let L = require('./util/logger.js')

function processArgs() {
  if (process.argv.length < 3)
    throw 'Usage: node index.js [organization slug]'

  global.org = process.argv[2]
}

async function main() {

  await token.getToken()
  await audit.setupClient()
  await processArgs()

  const teams = await audit.queryTeams()

  L.debug(require('util').inspect(teams, { depth: null }))
}

main()
