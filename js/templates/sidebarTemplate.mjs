const renderSideBar = ({name, login, avatarUrl, bio, followers, following, starredRepositories, status}) => {
  return `
        <div class="profile">
        <picture class="profile__picture">
          <img class="profile__avatar" alt="profile image" lazy src="${avatarUrl}">
           <div class="profile__status-badge">${status?.emojiHTML ?? '-'}</div>
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
              <strong class="profile__info-count">${followers.totalCount ?? 0}</strong> followers
            </a>
          </li>
          <li class="profile__info-item">
            <a class="profile__info-link">
              <strong class="profile__info-count">${following.totalCount ?? 0} </strong> following
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
export default renderSideBar;
