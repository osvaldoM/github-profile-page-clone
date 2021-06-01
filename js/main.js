const GH_ACCESS_TOKEN = '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';

const checkFetchResponseStatus = (response) => {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const query = `{
  user(login: "osvaldom") {
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
      'Authorization' : "bearer " + GH_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { login: userName },
    }),
  }).then(checkFetchResponseStatus)
    .then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err);
  });
}

fetchUser('osvaldom');
