import {checkFetchResponseStatus} from './helpers.mjs'


let GH_ACCESS_TOKEN = '';

const query = `query userAndRepositories($userName: String!){
  user(login: $userName) {
    avatarUrl
    bio
    name
    login
    followers {
      totalCount
    }
    following {
      totalCount
    }
    starredRepositories {
      totalCount
    }
    status {
      emojiHTML
      message
    }
    repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
      totalCount
      nodes {
        url
        name
        description
        updatedAt
        stargazerCount
        forkCount
        primaryLanguage {
          color
          name
        }
        licenseInfo {
          nickname
        }
      }
    }
  }
}
`

const fetchUser = (userName) => {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'omit',
    redirect: 'manual',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "bearer " + GH_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: {userName},
    }),
  }).then(checkFetchResponseStatus)
    .then(response => {
      return response.json();
    })
}

const isAuthenticated = () => GH_ACCESS_TOKEN ? true : false

const authenticate = token => GH_ACCESS_TOKEN = token;

export {
  fetchUser,
  isAuthenticated,
  authenticate
}
