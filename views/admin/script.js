


const adminPageInit = async () => {
  const userList = document.getElementById('user-list');
  const logoutBtn = document.getElementById('logout-btn');


  const getAndSetUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/getAllUsers')

      const data = await response.json();

      data.users.forEach(user => {

        let favoritesHTML = '<ul>';

        user.favorites.forEach(fav => {
          favoritesHTML += `<li>${fav.name}</li>`; // or whatever property you want to show
        });

        favoritesHTML += '</ul>';

        const userDiv = document.createElement('div');
        userDiv.className = 'user-card';
        userDiv.innerHTML = `
          <h3>${user.username} : ${user._id}</h3>
          <p>Email: ${user.email}</p>
          <p>Role: ${user.role}</p>
          <p>Favorites:</p>
          ${favoritesHTML}
        `;


        userList.appendChild(userDiv);
      })
    } catch (error) {
      console.error('Error retrieving users:', error);
    }
  }


  const logoutHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      const data = await response.json();

      // remove token and username from localStorage
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('role');
      // refresh the page to reflect the changes
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  getAndSetUsers();

  logoutBtn.addEventListener('click', logoutHandler);

}


window.addEventListener('DOMContentLoaded', adminPageInit);