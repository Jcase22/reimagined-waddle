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

const validateUsername = (username) => {
  if (username.length < 3) {
    alert('Username must be at least 3 characters long');
    return;
  }

  if (username.length > 15) {
    alert('Username must be at most 15 characters long');
    return;
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    alert('Username can only contain letters and numbers');
    return;
  }
}

const validateEmail = (email) => {
  if (email.length < 5) {
    alert('Email must be at least 5 characters long');
    return;
  }
  if (email.length > 50) {
    alert('Email must be at most 50 characters long');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Email can only contain letters, numbers, and special characters');
    return;
  }
}

const validatePassword = (password) => {
  if (password.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }
  if (password.length > 20) {
    alert('Password must be at most 20 characters long');
    return;
  }
  if (!/[a-z]/.test(password)) {
    alert('Password must contain at least one lowercase letter');
    return;
  }
  if (!/[A-Z]/.test(password)) {
    alert('Password must contain at least one uppercase letter');
    return;
  }
  if (!/[0-9]/.test(password)) {
    alert('Password must contain at least one number');
    return;
  }
  if (!/[!@#$%^&*]/.test(password)) {
    alert('Password must contain at least one special character');
    return;
  }
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

    validate inputs
    if (!username || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    validateUsername(username)
    validateEmail(email)
    validatePassword(password)


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

    window.localStorage.setItem('token', data.token);
    window.localStorage.setItem('username', username);

    window.location.href = '/';
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

form.addEventListener('submit', handleSubmit);
