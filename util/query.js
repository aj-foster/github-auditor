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

exports.teamRepoInitialBatch = `
  query TeamRepoInitialBatch($org: String!, $teamSlug: String!) {
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

exports.teamRepoBatch = `
  query TeamRepoBatch($org: String!, $teamSlug: String!, $repoCursor: String!) {
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

exports.teamUserInitialBatch = `
  query TeamUserInitialBatch($org: String!, $teamSlug: String!) {
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

exports.teamUserBatch = `
  query TeamUserBatch($org: String!, $teamSlug: String!, $userCursor: String!) {
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

exports.repoInitialBatch = `
  query RepoInitialBatch($org: String!) {
    organization(login: $org) {
      repositories(first: 100) {
        pageInfo {
          hasNextPage
          endCursor
        }

        nodes {
          name
          private: isPrivate
        }
      }
    }
  }
`

exports.repoBatch = `
  query RepoBatch($org: String!, $repoCursor: String!) {
    organization(login: $org) {
      repositories(first: 100, after: $repoCursor) {
        pageInfo {
          hasNextPage
          endCursor
        }

        nodes {
          name
          private: isPrivate
        }
      }
    }
  }
`

exports.repoUserInitialBatch = `
  query RepoUserInitialBatch($org: String!, $repoName: String!) {
    organization(login: $org) {
      repository(name: $repoName) {
        name

        collaborators(first: 100, affiliation: DIRECT) {
          pageInfo {
            hasNextPage
            endCursor
          }

          edges {
            permission

            node {
              name
              login
            }
          }
        }
      }
    }
  }
`

exports.repoUserBatch = `
  query RepoUserBatch($org: String!, $repoName: String!, $userCursor: String!) {
    organization(login: $org) {
      repository(name: $repoName) {
        name

        collaborators(first: 100, after: $userCursor, affiliation: DIRECT) {
          pageInfo {
            hasNextPage
            endCursor
          }

          edges {
            permission

            node {
              name
              login
            }
          }
        }
      }
    }
  }
`

exports.userInitialBatch = `
  query UserInitialBatch($org: String!) {
    organization(login: $org) {
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
`

exports.userBatch = `
  query UserBatch($org: String!, $userCursor: String!) {
    organization(login: $org) {
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
`
