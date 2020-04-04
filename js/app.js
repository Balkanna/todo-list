import Utils from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import About from './views/pages/about.js';
import Error404 from './views/pages/error404.js';

import AddAndList from './views/pages/tasks/add-list.js';
import Edit from './views/pages/tasks/edit.js';

const Routes = {
    '/': About,
    '/tasks': AddAndList,
    '/task/:id/edit': Edit
};

function router() {
    const headerContainer = document.querySelector('.header'),
        contentContainer = document.querySelector('.content-container'),
        footerContainer = document.querySelector('.footer'),
        header = new Header(),
        footer = new Footer();

    header.render().then(html => {
        headerContainer.innerHTML = html;
    });

    const request = Utils.parseRequestURL(),
        parsedURL = `/${ request.resource || '' }${ request.id ? '/:id' : '' }${ request.action ? `/${ request.action }` : '' }`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.render().then(html => {
        contentContainer.innerHTML = html;
        page.afterRender();
    });

    footer.render().then(html => {
        footerContainer.innerHTML = html;
    });
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
