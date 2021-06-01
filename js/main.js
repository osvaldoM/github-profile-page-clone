import renderSideBar from './templates/sidebarTemplate.js'
import renderRepositoryList from './templates/repositoryListTemplate.js'
import {fetchUser} from "./userService.js";

document.querySelector('.search-user-form').addEventListener('submit', event => {
  event.preventDefault();
  event.stopImmediatePropagation();
  const loadingSpinner = event.target.querySelector('.loading-spinner');
  loadingSpinner.classList.remove('hidden');

  const userName = event.target.user_name.value;

  fetchUser(userName).then(userData => {
    document.querySelector('.sidebar').innerHTML = renderSideBar(userData.data.user);
    document.querySelector('.repository__list').innerHTML = renderRepositoryList(userData.data.user.repositories.nodes);
    document.querySelector('.repositories-count').textContent = userData.data.user.repositories.totalCount;
    document.title = `${userData.data.user.login}(${userData.data.user.name})`;
  }).finally(res => {
    loadingSpinner.classList.add('hidden');
  });
});

/*
 * Handle toggle menu
 */
let isExpanded = false;
const toggleButton = document.querySelector('.main-nav__toggle-nav');

toggleButton.addEventListener('click', () => {
  isExpanded = !isExpanded;
  toggleButton.setAttribute('aria-expanded', isExpanded);
  toggleButton.closest('.main-nav__list').classList.toggle('expanded');
});
