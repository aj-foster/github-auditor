let audit = require('./lib/audit.js')
let token = require('./util/token.js')
let writer = require('./util/writer.js')
let L = require('./util/logger.js')

/* Process Command-Line Arguments
 *
 * We expect the user to pass in the name of the organization to query as the
 * first (and only) argument.
 */
const processArgs = function () {
  if (process.argv.length < 3)
    throw 'Usage: node index.js [organization slug]'

  global.org = process.argv[2]
}

/* Main Function
 *
 * This function is called at the bottom of this file to run everything. It
 * will utilize functions defined in various other modules and generally
 * control the flow of execution. Due to the nature of the program, we require
 * the steps taken in this function to be done syncronously.
 */
async function main() {

  await token.getToken()
  await audit.setupClient()
  await writer.setup()
  await processArgs()

  const teams = await audit.queryTeams()

  const data = []

  for (let i = 0; i < teams.length; i++) {
    const {name, slug} = teams[i]

    L.debug('[' + slug + '] Querying repositories')
    const rawRepos = await audit.queryRepos(slug)
    const repos = await audit.cleanRepos(rawRepos)

    L.debug('[' + slug + '] Querying members')
    const users = await audit.queryUsers(slug)

    data.push({
      name: name,
      slug: slug,
      repos: repos,
      users: users
    })
  }


  L.debug(require('util').inspect(data, { depth: null }))
  await writer.write({organization: global.org, teams: data})
}

// Let's kick things off.
main()
