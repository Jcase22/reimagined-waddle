const BASE_URL = 'http://localhost:3000/api/user';
// check if user is logged in
const username = window.localStorage.getItem('username');
const isLoggedIn = username !== null;
// ! This is a naive implementation of checking whether the user is logged in
// ! You should have an endpoint that allows the client to check if their current token is still valid.
// The steps are as follows:
// 1. check if token exists in localStorage
// 2. if not, then it means user is not logged in
// 3. if so, make a GET request to the API, append the token in either the header or the cookie. ex. http://localhost:3000/api/user/validate
// 4. If the response is OK, that means user is logged in.

// select necessary elements
const btnContainer = document.getElementById('btn-container');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const greeting = document.getElementById('greeting');

if (isLoggedIn) {
  // hide login/signup buttons
  loginBtn.style.display = 'none';
  signupBtn.style.display = 'none';

  // display needed content
  greeting.innerText = `Hello ${username}`;
  logoutBtn.style.display = 'inline';
} else {
  // show login/signup buttons
  loginBtn.style.display = 'inline';
  signupBtn.style.display = 'inline';

  // hide un-wanted content
  greeting.innerText = '';
  logoutBtn.style.display = 'none';
}

const logoutHanlder = () => {
  fetch(`${BASE_URL}/logout`)
    .then((res) => {
      if (!res.ok) {
        alert('Error Logging Out');
        return;
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      // after logging out, remove token and username from localStorage
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
    })
    .then(() => window.location.reload()) // refresh the page to reflect the page changes
    .catch((err) => {
      alert(err.message);
    });
};

logoutBtn.addEventListener('click', logoutHanlder);
