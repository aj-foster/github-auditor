let { GraphQLClient } = require('graphql-request')
let fs = require('fs')

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

const query = `
  query something($org: String!) {
    organization(login: $org) {
      teams(first: 10) {
        nodes {
          name
          repositories(first: 10) {
            edges {
              permission
              node {
                name
              }
            }
          }
        }
      }
    }
  }`

client
  .request(query, variables)
  .then(data => console.log(require('util').inspect(data, { depth: null })))
  .catch(err => console.log(err))
