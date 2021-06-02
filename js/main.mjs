import renderSideBar from './templates/sidebarTemplate.mjs'
import renderRepositoryList from './templates/repositoryListTemplate.mjs'
import {fetchUser, isAuthenticated, authenticate} from "./userService.mjs";

const renderUserData = (userData) => {
    document.querySelector('.sidebar').innerHTML = renderSideBar(userData.data.user);
    document.querySelector('.repository__list').innerHTML = renderRepositoryList(userData.data.user.repositories.nodes);
    document.querySelector('.repositories-count').textContent = userData.data.user.repositories.totalCount;
    document.title = `${userData.data.user.login}(${userData.data.user.name})`;
}

import('./sampleUser.mjs')
    .then(res => renderUserData(res.sampleUser))
    .catch(error => {
        console.log(error);
    });

document.querySelector('.search-user-form').addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();

    if(!isAuthenticated()){
        authenticate(prompt('The github Graphq API requires an authenticated user. Please insert a Github Personal Access token, you can generate a token at: https://github.com/settings/tokens'));
    }

    const loadingSpinner = event.target.querySelector('.loading-spinner');
    loadingSpinner.classList.remove('hidden');

    const userName = event.target.user_name.value;

    fetchUser(userName).then(renderUserData).catch(err => {
        alert('there has been an error, see the console for more details')
        console.log(err);
    }).finally(() => {
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
    toggleButton.setAttribute('aria-label', isExpanded ? 'Close navigation' : 'Open navigation');
    toggleButton.closest('.main-nav__list').classList.toggle('expanded');
});

document.addEventListener('keydown', (event) => {
    if(event.code === "Slash"){
        event.preventDefault();
        event.stopImmediatePropagation();
        document.querySelector('.user-name-input').focus();
    }
});
