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

/* Forms a list of repositories belonging to the given team.
 *
 * We expect `team` to be a string containing the slug version (lowercase,
 * dashed) of the team name. Since the first query may not retrieve all of the
 * repositories if there are more than 100, this function will iteratively call
 * the API until it reports that no more repos remain.
 */
exports.queryRepos = async function (team) {
  let res = await global.client
    .request(queries.teamRepoInitialBatch, {org: global.org, teamSlug: team})
    .then(data => data)
    .catch(err => {
      throw err
    })

  let repos = res.organization.team.repositories.edges
  let hasNextPage = res.organization.team.repositories.pageInfo.hasNextPage

  while (hasNextPage) {
    let cursor = res.organization.team.repositories.pageInfo.endCursor

    res = await global.client
      .request(queries.teamRepoBatch, {
        org: global.org,
        teamSlug: team,
        repoCursor: cursor
      })
      .then(data => data)
      .catch(err => {
        throw err
      })

    repos = repos.concat(res.organization.team.repositories.edges)
    hasNextPage = res.organization.team.repositories.pageInfo.hasNextPage
  }

  return repos
}

/* Forms a list of members belonging to the given team.
 *
 * We expect `team` to be a string containing the slug version (lowercase,
 * dashed) of the team name. Since the first query may not retrieve all of the
 * members if there are more than 100, this function will iteratively call
 * the API until it reports that no more users remain.
 */
exports.queryUsers = async function (team) {
  let res = await global.client
    .request(queries.teamUserInitialBatch, {org: global.org, teamSlug: team})
    .then(data => data)
    .catch(err => {
      throw err
    })

  let users = res.organization.team.members.nodes
  let hasNextPage = res.organization.team.members.pageInfo.hasNextPage

  while (hasNextPage) {
    let cursor = res.organization.team.members.pageInfo.endCursor

    res = await global.client
      .request(queries.teamUserBatch, {
        org: global.org,
        teamSlug: team,
        userCursor: cursor
      })
      .then(data => data)
      .catch(err => {
        throw err
      })

    users = users.concat(res.organization.team.members.nodes)
    hasNextPage = res.organization.team.members.pageInfo.hasNextPage
  }

  return users
}

exports.cleanRepos = function (repos) {
  return repos.map(function (repo) {
    const { permission, node: { name } } = repo
    return {name: name, permission: permission}
  })
}
