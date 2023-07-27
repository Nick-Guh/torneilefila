import {pageElements} from './modules/config.js';

pageElements.screenDarkener.JSelement.addEventListener('click', () => {
  if(pageElements.sidebar.JSelement.classList.contains('visible')) {
    pageElements.sidebar.JSelement.classList.remove('visible');
  } else {
    pageElements.sidebar.JSelement.classList.add('visible');
  }
})