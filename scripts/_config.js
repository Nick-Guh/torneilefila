const pageElements = {

  body: {
    JSelement: document.body,
    colored: true,
  },

  
  header: {
    JSelement: document.querySelector('header'),
    colored: true,
  },

  sidebar: {
    JSelement: document.querySelector('.sidebar'),
    colored: true,
  },

  main: {
    JSelement: document.querySelector('main'),
    colored: false,
  },

  stage: {
    JSelement: document.querySelectorAll('.stage'),
    colored: true,
  },
  
  match: {
    JSelement: document.querySelectorAll('.match'),
    colored: true,
  },

  matchResult: {
    JSelement: document.querySelectorAll('.match-result'),
    colored: true,
  },

  score: {
    JSelement: document.querySelectorAll('.score'),
    colored: true,
  },


  changeColorThemeButton: {
    JSelement: document.querySelector('.change-color-theme-btn'),
    colored: true,
  },  
}

export {pageElements};
