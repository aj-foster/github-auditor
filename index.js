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

  const rawTeams = await audit.queryTeams()
  const teams = []

  for (let i = 0; i < rawTeams.length; i++) {
    const {name, slug} = rawTeams[i]

    L.debug('[' + slug + '] Querying repositories')
    const rawRepos = await audit.queryTeamRepos(slug)
    const repos = await audit.cleanTeamRepos(rawRepos)

    L.debug('[' + slug + '] Querying members')
    const users = await audit.queryTeamUsers(slug)

    teams.push({
      name: name,
      slug: slug,
      repos: repos,
      users: users
    })
  }

  const rawRepos = await audit.queryRepos()
  const repos = []

  for (let i = 0; i < rawRepos.length; i++) {
    const {name, private: priv} = rawRepos[i]

    L.debug('[' + name + '] Querying collaborators')
    const rawCollabs = await audit.queryRepoUsers(name)
    const collabs = await audit.cleanRepoUsers(rawCollabs)

    repos.push({
      name: name,
      private: priv,
      collaborators: collabs
    })
  }

  L.debug('Querying all organization members')
  const users = await audit.queryUsers()

  await writer.writeJSON({
    organization: global.org,
    teams: teams,
    repositories: repos,
    users: users
  })
}

// Let's kick things off.
main()
