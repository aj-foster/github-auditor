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

exports.repoInitialBatch = `
  query TeamQuery($org: String!, $teamSlug: String!) {
    organization(login: $org) {
      team(slug: $teamSlug) {
        slug
        repositories(first: 100) {
          pageInfo {
            hasNextPage
            endCursor
          }

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
`

exports.repoBatch = `
  query TeamQuery($org: String!, $teamSlug: String!, $repoCursor: String!) {
    organization(login: $org) {
      team(slug: $teamSlug) {
        slug
        repositories(first: 100, after: $repoCursor) {
          pageInfo {
            hasNextPage
            endCursor
          }

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
`

exports.userInitialBatch = `
  query TeamQuery($org: String!, $teamSlug: String!) {
    organization(login: $org) {
      team(slug: $teamSlug) {
        slug

        members(first: 100) {
          pageInfo {
            hasNextPage
            endCursor
          }

          nodes {
            name
            login
          }
        }
      }
    }
  }
`

exports.userInitialBatch = `
  query TeamQuery($org: String!, $teamSlug: String!, $userCursor: String!) {
    organization(login: $org) {
      team(slug: $teamSlug) {
        slug

        members(first: 100, after: $userCursor) {
          pageInfo {
            hasNextPage
            endCursor
          }

          nodes {
            name
            login
          }
        }
      }
    }
  }
`
