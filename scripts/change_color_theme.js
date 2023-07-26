//import {pageElements} from '_config.js';


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














let colorTheme = localStorage.getItem('colorTheme') || 'dark-theme'
let colorThemeBefore = colorTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';

pageElements.changeColorThemeButton.JSelement.addEventListener('click', () => updateColorTheme())

renderColorTheme();


function updateColorTheme() {
  colorTheme = colorTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
  colorThemeBefore = colorTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';

  renderColorTheme();

  localStorage.setItem('colorTheme', colorTheme);
}

function renderColorTheme () {
  for(let element in pageElements) {
    const {JSelement, colored} = pageElements[element]; 
    if (JSelement instanceof NodeList && colored) {
      JSelement.forEach((value) => {
        value.classList.remove(colorThemeBefore);
        value.classList.add(colorTheme);
      })
    } else {
      colored && JSelement.classList.remove(colorThemeBefore); JSelement.classList.add(colorTheme);
    }
  };
}


// function filterObject (object, callback) {
//   object
// }



// let colorTheme = localStorage.getItem('colorTheme') || 'dark-theme'
  


// changeColorThemeButton.addEventListener('click', () => {
//   if (colorTheme === 'dark-theme') {
//     colorTheme = 'light-theme';
//   } else {
//     colorTheme = 'dark-theme';
//   }
  
//   console.log('color theme switched to: ' + colorTheme);

//   updateColorTheme(colorTheme);
// })


// function updateColorTheme(colorTheme) {
//   if (colorTheme === 'dark-theme') {
//     changeColorThemeButton.classList.remove('light-theme');
//     changeColorThemeButton.classList.add('dark-theme');
//   } else {  
//     changeColorThemeButton.classList.remove('dark-theme');
//     changeColorThemeButton.classList.add('light-theme');
//   }
// }
