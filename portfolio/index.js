import i18Obj from "./lang/translate.js";

// functions
function toggleMenu() {
  const menu = document.querySelector('.nav-list');
  this.classList.toggle('is-active');
  menu.classList.toggle('open');
}

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    document
      .querySelector('.hamburger')
      .classList.remove('is-active');
    document
      .querySelector('.nav-list')
      .classList.remove('open');
  }
}

function preloadImages(season) {
  for (let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/img/${season}/${i}.jpg`;
  }
}

function changeImage(event) {
  if (event.target.classList.contains('portfolio-btn')) {
    const season = event.target.dataset.season;
    const seasonIndex = seasons.indexOf(season);
    seasonSelected = seasons[seasonIndex];
    localStorage.setItem('season', seasons[seasonIndex]);
    portfolioImages.forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.jpg`);
    changeClassActive(event, 'portfolio-btn');
  }
}

function getTranslate(lng) {
  const translation = document.querySelectorAll('[data-i18]');
  translation.forEach((currentElement) => {
    if (Object.keys(i18Obj[lng]).indexOf(currentElement.dataset.i18) > -1) {
      const value = i18Obj[lng][currentElement.dataset.i18];
      if (currentElement.placeholder) {
        currentElement.placeholder = value;
        currentElement.textContent = '';
      } else {
        currentElement.textContent = value;
      }
    }
  });
}

function changeLanguage(event) {
  const currentLng = event.target.innerText;
  localStorage.setItem('lang', currentLng);
  lang = currentLng;
  getTranslate(currentLng);
  changeClassActive(event, 'lng');
}

function changeClassActive(event, className) {
  const activeBtn = document.querySelectorAll(`.${className}.active`);
  activeBtn.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function toggleTheme() {
  whiteThemeClassesList.forEach(item => {
    if (NodeList.prototype.isPrototypeOf(item)) {
      changeThemeForArray(item);
    } else {
      item.classList.toggle('light-theme');
    }
  });
}

function changeTheme(event) {
  if (event.target.src.indexOf('light') > -1) {
    theme = 'dark';
  } else {
    theme = 'light';
  }
  localStorage.setItem('theme', theme);
  toggleTheme();
}

function setLocalStorage() {
  localStorage.setItem('lang', lang);
  localStorage.setItem('theme', theme);
  localStorage.setItem('season', seasonSelected);
}

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
    language.forEach(lng => {
      if (lng.innerText === lang) {
        lng.classList.add('active');
      }
    });
    getTranslate(lang);
  }
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
    if (theme === 'light') {
      toggleTheme();
    }
  }
  if (localStorage.getItem('season')) {
    seasonSelected = localStorage.getItem('season');
    portfolioImages.forEach((img, index) => img.src = `assets/img/${seasonSelected}/${index + 1}.jpg`);
    portfolioBtn.forEach(btn => {
      if (btn.dataset.season === seasonSelected) {
        btn.classList.add('active');
      }
    });
  }
}

function changeThemeForArray(item) {
  item.forEach(el => {
    if (el.hasAttribute('data-svg')) {
      const svg = el.dataset.svg;
      if (el.src.indexOf('light') > -1) {
        el.src = `assets/svg/${svg}.svg`;
      } else {
        el.src = `assets/svg/${svg}-light.svg`;
      }
    } else {
      el.classList.toggle('light-theme');
    }
  });
}

//variables
let lang = 'en';
let theme = 'light';
let seasonSelected = 'autumn';
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const burger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioImages = document.querySelectorAll('.portfolio-img');
const language = document.querySelectorAll('.lng');
//selectors
const body = document.querySelector('body');
const headerSection = document.querySelector('.header .container');
const heroSection = document.querySelector('.hero');
const contactsSection = document.querySelector('.contacts');
const btnTheme = document.querySelector('.theme-btn');
const navList = document.querySelector('.nav-list');
//Arrays of selectors
const portfolioBtn = document.querySelectorAll('.portfolio-btn');
const sectionTitleArray = document.querySelectorAll('.section-title');
const anchorsArray = document.querySelectorAll('a');
const imgsSvgArray = document.querySelectorAll('[data-svg]');
//Array of objects for light theme
const whiteThemeClassesList = [
  body,
  heroSection,
  headerSection,
  contactsSection,
  btnTheme,
  navList,
  burger,
  language,
  portfolioBtns,
  sectionTitleArray,
  anchorsArray,
  imgsSvgArray
];

seasons.forEach(season => preloadImages(season));

//event listeners
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
btnTheme.addEventListener('click', changeTheme);
burger.addEventListener('click', toggleMenu);
portfolioBtns.addEventListener('click', changeImage);
navLinks.forEach(el => el.addEventListener('click', closeMenu));
language.forEach(ln => ln.addEventListener('click', changeLanguage));

console.log(`
1. Смена изображений в секции portfolio +25
2. Перевод страницы на два языка +25
3. Переключение светлой и тёмной темы +25
4. Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5
5. Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5

Summary: 85 points
`);
