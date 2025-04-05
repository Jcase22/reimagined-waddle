
let currentPage = 1;
let totalPages = 1;

const validate = async () => {
  try {
    const response = await fetch(`http://localhost:3000/user/tokenCheck`)

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

const homeInit = async () => {
  const isLoggedIn = await validate();

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if (isLoggedIn) {
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'inline';
  } else {
    loginBtn.style.display = 'inline';
    signupBtn.style.display = 'inline';
    logoutBtn.style.display = 'none';
  }

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(`/products?page=${page}`);
      const data = await response.json();

      console.log(data)

      currentPage = Number(data.page);
      totalPages = Number(data.totalPages);

      renderProducts(data.products);
      updateButtons();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const renderProducts = (products) => {
    const gallery = document.getElementById('productGallery');
    gallery.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';

      // comment right here in the innreHTML
      div.innerHTML = `
      <!-- <img src="${product.imageUrl}" alt="${product.name}" /> -->
      <h3>${product.name}</h3>
      `;
      gallery.appendChild(div);
    });
  }

  const updateButtons = () => {
    if (currentPage === 1) {
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'block';
    }

    // prevBtn.disabled = currentPage === 1;
    if (currentPage === totalPages) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'block';
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1);
    }
  });

  fetchProducts(1);

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
      console.log('Logout response:', data);

      // remove token and username from localStorage
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('userId');
      // refresh the page to reflect the changes
      // window.location.reload();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  logoutBtn.addEventListener('click', logoutHandler);
}

window.addEventListener('DOMContentLoaded', homeInit);