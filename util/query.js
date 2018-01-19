// Prewritten queries for gathering team, repo, and member info.

exports.teamInitialBatch = `
  query TeamInitialBatch($org: String!) {
    organization(login: $org) {
      teams(first: 100) {
        pageInfo {
          hasNextPage
          endCursor
        }

        nodes {
          name
          slug
        }
      }
    }
  }
`

exports.teamBatch = `
  query TeamBatch($org: String!, $teamCursor: String!) {
    organization(login: $org) {
      teams(first: 100, after: $teamCursor) {
        pageInfo {
          hasNextPage
          endCursor
        }

        nodes {
          name
          slug
        }
      }
    }
  }
`

exports.teamInitialQuery = `
  query TeamQuery($org: String!, $teamSlug: String!) {
    organization(login: $org) {
      team(slug: $teamSlug) {
        slug
        repositories(first: 10) {
          edges {
            permission
            node {
              name
            }
          }
        }

        members(first: 10) {
          nodes {
            name
            login
          }
        }
      }
    }
  }
`
