const header = document.querySelector('.header-full');
const headerPlaceholder = document.querySelector('.header-placeholder');
const menu = document.querySelector('.menu');
const accountBtn = document.querySelector('#account-link');
const hiddenMenuBtn = document.querySelector('.menu-hidden');
let hidden = true;


accountBtn.addEventListener('click', function () {
    if (localStorage.getItem('token') === null) {
        location.replace('./account-login.html');
    }
    else if (localStorage.getItem('username') === 'admin') {
        location.replace('./account-admin.html');
    } else {
        location.replace('./account-user.html');
    }
});

hiddenMenuBtn.addEventListener('click', function() {
    if (hidden === true) {
        header.style.height = '160px';
        headerPlaceholder.style.height = '160px';
        menu.style.display = 'flex';
        hidden = false;
    } else
    {
        header.style.height = '65px';
        headerPlaceholder.style.height = '65px';
        menu.style.display = 'none';
        hidden = true;
    }
});
