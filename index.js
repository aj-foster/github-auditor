let audit = require('./lib/audit.js')
let token = require('./util/token.js')
let writer = require('./util/writer.js')
let reporter = require('./lib/report.js')
let L = require('./util/logger.js')


/* Data Retrieval
 *
 * This function runs (sequentially) all of the steps necessary to retrieve
 * audit data from GitHub.
 */
const retrieve = async function() {

  await token.getToken()
  await audit.setupClient()
  await writer.setup()

  const viewer = await audit.testClient()

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
    users: users,
    login: viewer,
    time: (new Date(Date.now())).toDateString()
  })
}


/* Data Reporting
 *
 * This functions runs the steps necessary to report existing audit data from
 * GitHub. It is assumed that retrieve() has either just run, or was run at
 * some point in the past with its JSON files remaining.
 */
const report = async function() {
  reporter.test()
}


/* Process Command-Line Arguments
 *
 * We expect the user either to pass in the name of the organization to query
 * as the first (and only) argument, or to pass in a verb (retrieve | report)
 * followed by the name of the organization.
 */
if (process.argv.length < 3)
  throw 'Usage: node index.js [organization slug]'

if (process.argv.length > 3) {
  global.org = process.argv[3]

  if (process.argv[2] === 'retrieve') {
    retrieve()
  }

  if (process.argv[2] === 'report') {
    report()
  }
}
else {
  global.org = process.argv[2];

  (async function () {
    await retrieve()
    await report()
  })()
}
