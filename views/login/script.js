const BASE_URL = 'http://localhost:3000/user';

const validate = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tokenCheck`)

    const data = await response.json();

    return data.isValid;
  } catch (error) {
    console.log(error);
  }
}

const init = async () => {

  const isLoggedIn = await validate();

  if (isLoggedIn) {
    // if already logged in, redirect to home page
    window.location.href = '/';
  }

  // select needed elements
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // after login, set the token and username to localStorage
      window.localStorage.setItem('userId', data._id);

      // redirect to home page
      window.location.href = '/';
    } catch (err) {
      console.error('Login error:', err);
      alert(err.message);
    }
  };

  form.addEventListener('submit', handleSubmit);

}

window.addEventListener('DOMContentLoaded', init);