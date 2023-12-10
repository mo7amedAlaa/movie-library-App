const uncommingSec = document.getElementById('uncommingSec');
const navOpenBtn = document.querySelector('[data-menu-open-btn]');
const navCloseBtn = document.querySelector('[data-menu-close-btn]');
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');
const navElemArr = [navOpenBtn, navCloseBtn, overlay];
for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener('click', function () {
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('active');
  });
}

/**
 * header sticky
 */

const header = document.querySelector('[data-header]');

window.addEventListener('scroll', function () {
  window.scrollY >= 10
    ? header.classList.add('active')
    : header.classList.remove('active');
});

/**
 * go top
 */

const goTopBtn = document.querySelector('[data-go-top]');

window.addEventListener('scroll', function () {
  window.scrollY >= 500
    ? goTopBtn.classList.add('active')
    : goTopBtn.classList.remove('active');
});
let body = document.body;
let gotoTop = document.getElementById('go-top');
let darkModeToggle = document.getElementById('dark-mode');
darkModeToggle.addEventListener('click', function () {
  body.classList.toggle('dark');
  // navbar.classList.toggle('dark');
  header.classList.toggle('dark');
  overlay.classList.toggle('dark');
  gotoTop.classList.toggle('dark');
});
function changeLanguage() {
  // Get the selected language from the dropdown
  var lang = document.getElementById('lang').value;

  // Change the language based on the selected value
  if (lang == 'en') {
    changeToEnglish();
  } else if (lang == 'ar') {
    changeToArabic();
  }
}
