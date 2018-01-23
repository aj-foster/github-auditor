let queries = require('../util/query.js')
let { GraphQLClient } = require('graphql-request')

/* Sets up a GraphQL client.
 *
 * Using the graphql-request library, we create a GraphQL client for the GitHub
 * API endpoint using a Personal Access Token which has previously been loaded
 * as `global.token`.
 */
exports.setupClient = function () {
  if (typeof global.token !== 'string')
    throw 'Unable to use the loaded token'

  global.client = new GraphQLClient(
    'https://api.github.com/graphql',
    {
      headers: {
        Authorization: 'Bearer ' + global.token
      }
    })
}

/* Forms a list of teams in the organization.
 *
 * Since the first query may not retrieve all of the teams if there are more
 * than 100, this function will iteratively call the API until it reports that
 * no more teams remain.
 */
exports.queryTeams = async function () {
  let res = await global.client
    .request(queries.teamInitialBatch, {org: global.org})
    .then(data => data)
    .catch(err => {
      throw err
    })

  let teams = res.organization.teams.nodes
  let hasNextPage = res.organization.teams.pageInfo.hasNextPage

  while (hasNextPage) {
    let cursor = res.organization.teams.pageInfo.endCursor

    res = await global.client
      .request(queries.teamBatch, {org: global.org, teamCursor: cursor})
      .then(data => data)
      .catch(err => {
        throw err
      })

    teams = teams.concat(res.organization.teams.nodes)
    hasNextPage = res.organization.teams.pageInfo.hasNextPage
  }

  return teams
}
