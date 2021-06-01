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

const checkFetchResponseStatus = (response) => {
  if(response.ok){
    return Promise.resolve(response)
  } else{
    return Promise.reject(new Error(response.statusText))
  }
}

const formatSimpleDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  if(date.getFullYear() < today.getFullYear()) {
    return date.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  return date.toLocaleString('en-GB', {
    month: 'short',
    day: 'numeric'
  });
}

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
    }).catch(err => {
      console.log(err);
    });
}

const renderSideBar = ({name, login, avatarUrl, bio, followers, following, starredRepositories}) => {
  return `
        <div class="profile">
        <picture class="profile__picture">
          <img class="profile__avatar" alt="" lazy
               src="${avatarUrl}">
        </picture>
        <div>
          <h1 class="profile__name" itemprop="name">${name ?? '-'}</h1>
          <p class="profile__nickname" itemprop="additionalName">${login ?? '-'}</p>
        </div>
        <p class="profile__bio">
          ${bio}
        </p>
        <button class="btn profile__edit-btn">Follow</button>
        <ul class="profile__info-list">
          <li class="profile__info-item">
            <a class="profile__info-link">
              <svg class="profile__info-icon" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16"
                   class="octicon octicon-people text-icon-tertiary">
                <path fill-rule="evenodd"
                      d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path>
              </svg>
              <strong class="profile__info-count">${followers.totalCount ?? 0}</strong> followers &nbsp;·
            </a>
          </li>
          <li class="profile__info-item">
            <a class="profile__info-link">
              <strong class="profile__info-count">${following.totalCount ?? 0} </strong> following &nbsp;·
            </a>
          </li>
          <li class="profile__info-item">
            <a class="profile__info-link">
              <svg class="profile__info-icon" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16"
                   class="octicon octicon-star text-icon-tertiary">
                <path fill-rule="evenodd"
                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
              </svg>
              <strong class="profile__info-count">${starredRepositories.totalCount ?? 0}</strong>
            </a>
          </li>
        </ul>
      </div>
  `
}

const renderRepositories = (repositories => {
  return repositories.map(({name, description, primaryLanguage, licenseInfo, updatedAt}) => {
    return `
                <li class="repository__item">
              <div>
                <h3>
                  <a href="#" class="repository__name">${name?? '-'}</a>
                </h3>
                <p class="repository__description">${description ?? '-'}</p>
                <div class="flex repository-meta">
                  <span class="repository-meta__item">
                    <span class="language-color" style="background-color: ${primaryLanguage?.color}"></span> ${primaryLanguage?.name ?? '-'}
                  </span>
                  <span class="repository-meta__item">${licenseInfo?.nickname ?? ''}</span>
                  <span class="repository-meta__item"> Updated on ${updatedAt ? formatSimpleDate(updatedAt) : '-'}</span>
                </div>
              </div>
              <button class="btn star-repo-btn">
                <svg class="fill-current mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                </svg>
                Star
              </button>
            </li>
    `
  }).join('');
})

document.querySelector('.search-user-form').addEventListener('submit', event => {
  if(!GH_ACCESS_TOKEN) {
    GH_ACCESS_TOKEN = prompt('Please insert a Github Personal Access token, you can generate a token at: https://github.com/settings/tokens')
  }
  event.preventDefault();
  event.stopImmediatePropagation();
  const loadingSpinner = event.target.querySelector('.loading-spinner');
  loadingSpinner.classList.remove('hidden');

  const userName = event.target.user_name.value;

  fetchUser(userName).then(userData => {
    document.querySelector('.sidebar').innerHTML = renderSideBar(userData.data.user);
    document.querySelector('.repository__list').innerHTML = renderRepositories(userData.data.user.repositories.nodes);
    document.querySelector('.repositories-count').textContent = userData.data.user.repositories.totalCount
  }).finally(res => {
    loadingSpinner.classList.add('hidden');
  });
});
