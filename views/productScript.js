const url = window.location.href;
const productId = url.split('/')[5]

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

const productPageInit = async () => {
  const productContainer = document.getElementById('product-container');
  const relatedProducts = document.getElementById('related-products');
  const userId = window.localStorage.getItem('userId');

  const isLoggedIn = await validate();

  const detailsResponse = await fetch(`http://localhost:3000/products/details/${productId}`);

  const detailsData = await detailsResponse.json();

  console.log('detailsData', detailsData);

  productContainer.innerHTML = `
  <img src="${detailsData.product.image}" alt="${detailsData.product.name}">
  <div class="product-details">
  <h1>${detailsData.product.name}</h1>
  <p>${detailsData.product.description}</p>
  <button id="add-fav">Favorite</button>
  </div>
    `
  const favoriteBtn = document.getElementById('add-fav');

  if (isLoggedIn) {
    favoriteBtn.style.display = 'inline';
  } else {
    favoriteBtn.style.display = 'none';
  }

  favoriteBtn.addEventListener('click', async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/add-favorites/${userId}/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  })

  const brandProductResponse = await fetch(`http://localhost:3000/products/brand/${detailsData.product.brand}`);

  const brandProductData = await brandProductResponse.json();

  brandProductData.products.forEach(product => {

    // Check if the product is the same as the current product
    if (product._id === productId) {
      return;
    }

    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `
    <div>
      <a href="/product/details/${product._id}">
        <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 60px;">
        <h3>${product.name}</h3>
      </a>
    </div>
    `;
    relatedProducts.appendChild(div);
  });


}

window.addEventListener('DOMContentLoaded', productPageInit);