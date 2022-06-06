const inputsArr = document.querySelectorAll('.input-field');
const loginButton = document.querySelector('.login-btn');

function loginUser() {
    let username = inputsArr[0].value;
    let password = inputsArr[1].value;

    fetch('http://127.0.0.1:5000/user/login', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    }).then(response => {
        if (response.status === 200) {
            if (username === 'admin') {
                location.replace('./account-admin.html');
            } else {
                location.replace('./account-user.html');
            }
        } else {
            alert(response.message);
        }
        return response.json();
    }).then(data => {
        localStorage.setItem('token', data.token);
        if (username === 'admin') {
            localStorage.setItem('username', 'admin');
        } else {
            localStorage.setItem('username', username);
        }
        return data;
    }).catch(error => {
        return error;
    });
}

loginButton.addEventListener('click', loginUser);

