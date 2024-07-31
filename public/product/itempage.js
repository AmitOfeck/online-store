
document.addEventListener('DOMContentLoaded', function() {
    const productData = JSON.parse(localStorage.getItem('productData'));

    if (productData) {
        document.getElementById('category-link').textContent = productData.category;
        document.getElementById('sub-category-link').textContent = productData.subCategory;
        document.getElementById('product-name').textContent = productData.name;
        document.getElementById('product-image').src = productData.image;
        document.getElementById('product-price').textContent = `₪${productData.price}`;
        document.getElementById('product-manufacturer').textContent = productData.manufacturer;
        document.getElementById('product-weight').textContent = `${productData.weight} ${productData.weightUnit}`;

        document.getElementById('add-to-cart-button').addEventListener('click', function() {
            addToCart(productData._id);
        });
    } else {
        alert('No product data found');
    } 

});





document.addEventListener('DOMContentLoaded', async function() {
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(productId)
  
    if (productId) {
      try {
        // Fetch product data from the server
        const productData = await fetchData(productId);
        console.log(productData)
  
        if (productData) {
          // Display product details
          document.getElementById('category-link').textContent = productData.category;
          document.getElementById('sub-category-link').textContent = productData.subCategory;
          document.getElementById('product-name').textContent = productData.name;
          document.getElementById('product-image').src = productData.image;
          document.getElementById('product-price').textContent = `₪${productData.price}`;
          document.getElementById('product-manufacturer').textContent = productData.manufacturer;
          document.getElementById('product-weight').textContent = `${productData.weight} ${productData.weightUnit}`;
  
          // Add event listener to the "Add to Cart" button
          document.getElementById('add-to-cart-button').addEventListener('click', function() {
            addToCart(productData._id);
          });
        } else {
          alert('Product data not found');
        }
      } catch (error) {
        alert('Error fetching product data');
        console.error(error);
      }
    } /*else {
      alert('No product ID found in URL');
    }*/
  });


async function fetchData(productId) {
    try {
      const response = await fetch(`http://localhost:8080/products/${productId}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching product data: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null;
    }
  }