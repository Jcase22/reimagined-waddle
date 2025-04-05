const BASE_URL = 'http://localhost:3000/user';

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
const form = document.getElementById('signup-form');
const usernameInput = document.getElementById('reg-username');
const emailInput = document.getElementById('reg-email');
const passwordInput = document.getElementById('reg-password');

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log('Signup response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    // after signup, set the token and username to the localStorage, you don't have to set the username in localStorage, it is just for display purposes
    // window.localStorage.setItem('token', data.token);
    // window.localStorage.setItem('username', username);

    // window.location.href = '/';
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

form.addEventListener('submit', handleSubmit);
