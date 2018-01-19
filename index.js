let { GraphQLClient } = require('graphql-request')
let queries = require('./util/query.js')
let fs = require('fs')

async function main() {

  const token = fs.readFileSync('token.secret', 'utf8').trim()

  const client = new GraphQLClient(
    'https://api.github.com/graphql',
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })


  const variables = {
    org: 'codeschool'
  }

  let res = await client
    .request(queries.teamInitialBatch, variables)
    .then(data => data)
    .catch(err => {
      throw err
    })

  let teams = res.organization.teams.nodes

  let hasNextPage = res.organization.teams.pageInfo.hasNextPage

  while (hasNextPage) {
    let cursor = res.organization.teams.pageInfo.endCursor

    res = await client
      .request(queries.teamBatch, {org: 'codeschool', teamCursor: cursor})
      .then(data => data)
      .catch(err => {
        throw err
      })

    teams = teams.concat(res.organization.teams.nodes)

    hasNextPage = res.organization.teams.pageInfo.hasNextPage
  }

  console.log(require('util').inspect(teams, { depth: null }));
}

main()
