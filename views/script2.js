const url = window.location.href;
const productId = url.split('/')[5]

const productPageInit = async () => {
  const productContainer = document.getElementById('product-container');
  const userId = window.localStorage.getItem('userId');

  const detailsResponse = await fetch(`http://localhost:3000/products/details/${productId}`);

  const detailsData = await detailsResponse.json();

  console.log('details data', detailsData)

  productContainer.innerHTML = `
  <div class="product-details"></div>
    <h1>${detailsData.product.name}</h1>
    <p>${detailsData.product.description}</p>
    <button id="add-fav">Favorite</button>
    `
    const favoriteBtn = document.getElementById('add-fav');

  favoriteBtn.addEventListener('click', async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/add-favorites/${userId}/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      console.log('Favorite added:', data);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  })

}

window.addEventListener('DOMContentLoaded', productPageInit);