const GH_ACCESS_TOKEN = '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';

const checkFetchResponseStatus = (response) => {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const query = `query userAndRepositories($userName: String!){
  user(login: $userName) {
    avatarUrl
    bio
    followers {
      totalCount
    }
    following {
      totalCount
    }
    starredRepositories {
      totalCount
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
      }
    }
  }
}
`

const fetchUser = (userName) => {
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'omit',
    redirect: 'manual',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : "bearer " + GH_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { userName },
    }),
  }).then(checkFetchResponseStatus)
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err);
  });
}

fetchUser('osvaldom');
