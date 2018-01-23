let queries = require('../util/query.js')
let { GraphQLClient } = require('graphql-request')

// Set up GraphQL client

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
