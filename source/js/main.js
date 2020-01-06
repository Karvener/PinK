var mobileToggle = document.querySelector('.menu-toggle');
var mobileMenu = document.querySelector('.main-nav-list');
var mainNav = document.querySelector('.main-nav');

mobileToggle.addEventListener('click', function() {
  if(mobileToggle.classList.contains('menu-close')) {
    mobileToggle.classList.remove('menu-close');
    mobileMenu.classList.add('nav-list-none');
    mainNav.classList.remove('main-nav-open');
  }
  else {
    mobileToggle.classList.add('menu-close');
    mobileMenu.classList.remove('nav-list-none');
    mainNav.classList.add('main-nav-open');
  }
});



