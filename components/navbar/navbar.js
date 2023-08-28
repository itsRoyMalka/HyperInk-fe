// load-navbar.js

function logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('admin');


    fetch('https://hyperink-be.onrender.com//api/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },

    })
        .then(response => {
            if (response.ok) {

                window.location.href = '/home';
            } else {

                console.error('Logout failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
}


document.addEventListener('DOMContentLoaded', async () => {
    try {

        const response = await fetch('components/navbar/navbar.html');


        if (!response.ok) {
            throw new Error('Failed to load navbar.html');
        }


        const navbarHtml = await response.text();

        const navbarContainer = document.getElementById('navbar-container');
        navbarContainer.innerHTML = navbarHtml;


        const token = localStorage.getItem('token');
        const admin = localStorage.getItem('admin');
        const loginLinkContainer = document.getElementById('login-link-container');
        const signupLinkContainer = document.getElementById('signup-link-container');
        const adminLinkContainer = document.getElementById('control-panel-link-container');

        if(admin){
            adminLinkContainer.innerHTML = '<a href="admin.html">admin</a>';
        }else if(token){
            adminLinkContainer.innerHTML = '<a href="user.html">User</a>';
        }



        if (token) {
            loginLinkContainer.innerHTML = '<a href="index.html" onclick="logout()">Log Out</a>';
        } else {
            loginLinkContainer.innerHTML = '<a  href="login.html">Login</a>';
            signupLinkContainer.innerHTML = '<a  href="signup.html">Sign up</a>';
        }
    } catch (error) {
        console.error('An error occurred while loading the navbar:', error);
    }
});


