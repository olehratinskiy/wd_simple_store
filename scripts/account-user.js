const userInfoButton = document.querySelector('#user-info-btn');
const logoutButton = document.querySelector('#logout');

userInfoButton.addEventListener('click', function () {
    fetch('http://127.0.0.1:5000/user/' + localStorage.getItem('username'), {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    }).then(response => {
        if (response.status === 200) {
            location.replace('./account-user-info.html');
        } else {
            alert(response.message);
        }
        return response.json();
    }).then(data => {
        document.cookie = 'form/firstName=' + data.first_name;
        document.cookie = 'form/lastName=' + data.last_name;
        document.cookie = 'form/email=' + data.email;
        document.cookie = 'form/username=' + data.username;
        return data;
    }).catch(error => {
        return error;
    });
});

logoutButton.addEventListener('click', function () {
    document.cookie = 'form/firstName' + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[something];';
    document.cookie = 'form/lastName' + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[something];';
    document.cookie = 'form/email' + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[something];';
    document.cookie = 'form/username' + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=[something];';
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    location.replace('./account-login.html');
});