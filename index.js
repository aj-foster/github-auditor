let queries = require('./util/query.js')
let audit = require('./lib/audit.js')
let token = require('./util/token.js')

async function main() {


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
  await token.getToken()
  await audit.setupClient()

    hasNextPage = res.organization.teams.pageInfo.hasNextPage
  }

  console.log(require('util').inspect(teams, { depth: null }));
}

main()
