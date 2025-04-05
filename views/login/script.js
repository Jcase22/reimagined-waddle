const BASE_URL = 'http://localhost:3000/api/user';

// check if user is logged in
// ! This is a naive implementation of checking whether the user is logged in
// ! You should have an endpoint that allows the client to check if their current token is still valid.
const username = window.localStorage.getItem('username');
const isLoggedIn = username !== null;

if (isLoggedIn) {
  // if already logged in, redirect to home page
  window.location.href = '/';
}

// select needed elements
const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const handleSubmit = async (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // after login, set the token and username to localStorage
    window.localStorage.setItem('token', data.token);
    window.localStorage.setItem('username', username);

    // redirect to home page
    window.location.href = '/';
  } catch (err) {
    console.error('Login error:', err);
    alert(err.message);
  }
};
form.addEventListener('submit', handleSubmit);
