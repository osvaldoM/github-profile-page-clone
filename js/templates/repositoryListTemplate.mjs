import {formatSimpleDate} from "../helpers.mjs";

const renderRepositories = repositories => {
  return repositories.map(({name, description, primaryLanguage, licenseInfo, updatedAt}) => {
    return `
                <li class="repository__item">
              <div>
                <h3>
                  <a href="#" class="repository__name">${name ?? '-'}</a>
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
}

export default renderRepositories;
