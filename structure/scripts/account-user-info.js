const firstNameField = document.querySelector('#first_name');
const lastNameField = document.querySelector('#last_name');
const emailField = document.querySelector('#email');
const usernameField = document.querySelector('#username');

window.addEventListener('load', function() {
    let COOKIES = {};
    let cookieStr = document.cookie;
    cookieStr.split(/; /).forEach(function(keyValuePair) {
        let cookieName = keyValuePair.replace(/=.*$/, '');
        COOKIES[cookieName] = keyValuePair.replace(/^[^=]*=/, '');
    });
    firstNameField.value = COOKIES['form/firstName'];
    lastNameField.value = COOKIES['form/lastName'];
    emailField.value = COOKIES['form/email'];
    usernameField.value = COOKIES['form/username'];
});
