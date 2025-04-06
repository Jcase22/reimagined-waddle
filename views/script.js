const BASE_URL = 'http://localhost:3000/user';

const validate = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tokenCheck`)

    const data = await response.json();

    if (data.isValid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

const getUserData = async () => {

  const userId = window.localStorage.getItem('userId');

  try {
    const response = await fetch(`${BASE_URL}/${userId}`)

    if (!response.ok) {
      alert('Error fetching user data');
      return;
    }

    const data = await response.json();

    window.localStorage.setItem('username', data.user.username);
    window.localStorage.setItem('role', data.user.role);

    return data;
  } catch (error) {
    console.log(error);
  }
}


const role = window.localStorage.getItem('role');
if (role === 'admin') {
  // redirect to admin page
  window.location.href = '/admin';
}

// select necessary elements
const init = async () => {
  const isLoggedIn = await validate();

  const btnContainer = document.getElementById('btn-container');
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const greeting = document.getElementById('greeting');

  if (isLoggedIn) {
    // hide login/signup buttons
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';

    await getUserData()
    const username = window.localStorage.getItem('username');

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



  const logoutHandler = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      const data = await response.json();

      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('role');

      // redirect to home page
      window.location.href = '/';
      // refresh the page to reflect the changes
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  logoutBtn.addEventListener('click', logoutHandler);
}

window.addEventListener('DOMContentLoaded', init);
