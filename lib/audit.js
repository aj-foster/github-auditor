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

