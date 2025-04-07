
let currentPage = 1;
let totalPages = 1;
let brand = '';
let type = '';

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

const role = window.localStorage.getItem('role');
if (role === 'admin') {
  // redirect to admin page
  window.location.href = '/admin';
}


const homeInit = async () => {
  const isLoggedIn = await validate();

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const sidebar = document.getElementById('sidebar');
  const brandSelect = document.getElementById('brand-select');

  if (isLoggedIn) {
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    logoutBtn.style.display = 'inline';
    sidebar.style.display = 'block';
  } else {
    loginBtn.style.display = 'inline';
    signupBtn.style.display = 'inline';
    logoutBtn.style.display = 'none';
    sidebar.style.display = 'none';
  }

  const renderProducts = (products) => {
    const gallery = document.getElementById('productGallery');
    gallery.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';

      // comment right here in the innreHTML
      div.innerHTML = `
      <a href="/product/details/${product._id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
      </a>
      `;
      gallery.appendChild(div);
    });
  }

  const fetchProducts = async (page, brand = '', type = '') => {
    try {

      const response = await fetch(`/products?page=${page}&brand=${brand}&type=${type}`);
      const data = await response.json();

      currentPage = Number(data.page);
      totalPages = Number(data.totalPages);

      renderProducts(data.products, brand, type);
      updateButtons();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }


  const updateButtons = () => {
    if (currentPage === 1) {
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'block';
    }

    if (currentPage === totalPages) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'block';
    }
  }

  const loadSidebarContent = async () => {
    const userId = window.localStorage.getItem('userId');

    try {

      const response = await fetch(`http://localhost:3000/products/favorites/${userId}`);
      const data = await response.json();
      console.log('sidebar data', data);

      data.favorites.forEach(product => {
        const div = document.createElement('div');
        div.className = 'favorite-product';

        div.innerHTML = `
        <a href="/product/details/${product._id}">
        <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">
          <h3>${product.name}</h3>
        </a>
        <button class="remove-favorite" data-product-id="${product._id}" style="margin-bottom: 10px;">Remove</button>
        `;
        sidebar.appendChild(div);
      });

      const removeButtons = document.querySelectorAll('.remove-favorite');

      removeButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
          const productId = e.target.dataset.productId;
          const userId = window.localStorage.getItem('userId');

          try {
            const response = await fetch(`http://localhost:3000/products/favorites/${userId}/${productId}`, {
              method: 'PATCH',
            });

            if (!response.ok) {
              throw new Error('Failed to remove favorite');
            }

            const data = await response.json();

            e.target.parentElement.remove();
          } catch (error) {
            console.error('Error removing favorite:', error);
          }
        });
      })
    } catch (error) {
      console.error(error);
    }
  }

  brandSelect.addEventListener('change', (e) => {
    brand = e.target.value;
    currentPage = 1;
    fetchProducts(currentPage, brand, type);
  });

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1, brand, type);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1, brand, type);
    }
  });

  // fetch products on page load
  fetchProducts(1);
  loadSidebarContent();

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

  logoutBtn.addEventListener('click', logoutHandler);
}

window.addEventListener('DOMContentLoaded', homeInit);