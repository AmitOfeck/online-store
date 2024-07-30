let products = [];
let cart = [];
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalSum = document.getElementById('total-sum');

async function fetchProducts() {
  try {
    const token = localStorage.getItem('token'); 
    const response = await fetch('http://localhost:8080/products/', {
      method: 'GET',
      headers: {
        'Authorization': `${token}` 
      }
    });

    if (!response.ok) {
      console.log('Response Status:', response.status);
      console.log('Response Status Text:', response.statusText);
      throw new Error('Failed to fetch products');
    }

    products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

async function fetchCart() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/orders/get-my-cart', {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      }
    });

    if (!response.ok) {
      console.log('Response Status:', response.status);
      console.log('Response Status Text:', response.statusText);
      throw new Error('Failed to fetch cart');
    }

    const order = await response.json();
    localStorage.setItem('orderId' , order._id)
    cart = order.items;
    renderCart();
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
}

function renderProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h5>${product.name}</h5>
      <p>${product.weight} ${product.weightUnit}</p>
      <p>$${product.price}</p>
      <button class="btn btn-add-to-cart" onclick="addToCart('${product._id}')">Add to Cart</button>
    `;

    productList.appendChild(productCard);
  });
}

function renderCart() {
  cartItems.innerHTML = '';
  let sum = 0;

  cart.forEach(item => {
    const product = products.find(p => p._id === item.id);

    if (!product) {
      console.warn(`Product with ID ${item.productId} not found`);
      return; 
    }

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    cartItem.innerHTML = `
      <div class="input-group small-input-group">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button" onclick="decreaseQuantity('${item.id}')">-</button>
        </div>
        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" onclick="increaseQuantity('${item.id}')">+</button>
        </div>
      </div>
      <div class="ml-3 cart-prod-info">
        <span class="cart-prod-text">${product.name}</span>
        <span class="cart-prod-text">$${product.price}</span>
      </div>
      <div class="ml-auto">
        <img src="${product.image}" alt="${product.name}">
      </div>
    `;

    cartItems.appendChild(cartItem);
    sum += product.price * item.quantity;
  });

  totalSum.innerText = sum.toFixed(2);
}


async function addToCart(productId) {
try {

// Retrieve the current order ID (you should store it in a variable or localStorage)
const orderId = localStorage.getItem('orderId'); // Adjust as necessary

const response = await fetch(`http://localhost:8080/orders/${orderId}/add-to-cart/${productId}`, {
  method: 'POST',
  headers: {
    'Authorization': `${localStorage.getItem('token')}`, // Include token for authentication
    'Content-Type': 'application/json'
  }
});

if (!response.ok) {
  throw new Error(`Error adding to cart: ${response.statusText}`);
}

const cartUpdate = await response.json();

// Assuming cartUpdate contains the updated cart info
cart = cartUpdate.items;
renderCart();
} catch (error) {
console.error('Error adding to cart:', error);
}
}


async function increaseQuantity(productId) {
try {
const orderId = localStorage.getItem('orderId'); // Retrieve the order ID
const response = await fetch(`http://localhost:8080/orders/${orderId}/add-to-cart/${productId}`, {
  method: 'POST',
  headers: {
    'Authorization': `${localStorage.getItem('token')}`, // Include token for authentication
    'Content-Type': 'application/json'
  }
});

if (!response.ok) {
  throw new Error(`Error increasing quantity: ${response.statusText}`);
}

const cartUpdate = await response.json();
cart = cartUpdate.items; // Update cart with the latest items
renderCart(); // Re-render the cart
} catch (error) {
console.error('Error increasing quantity:', error);
}
}



async function decreaseQuantity(productId) {
try {
const orderId = localStorage.getItem('orderId'); // Retrieve the order ID
const response = await fetch(`http://localhost:8080/orders/${orderId}/remove-from-cart/${productId}`, {
  method: 'POST',
  headers: {
    'Authorization': `${localStorage.getItem('token')}`, // Include token for authentication
    'Content-Type': 'application/json'
  }
});

if (!response.ok) {
  throw new Error(`Error decreasing quantity: ${response.statusText}`);
}

const cartUpdate = await response.json();
cart = cartUpdate.items; // Update cart with the latest items
renderCart(); // Re-render the cart
} catch (error) {
console.error('Error decreasing quantity:', error);
}
}

async function payNow() {
try {
const orderId = localStorage.getItem('orderId'); // Retrieve the current order ID
const token = localStorage.getItem('token');


const res = await fetch('http://localhost:8080/orders/get-my-cart', {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      }
    });

    if (!res.ok) {
      console.log('Response Status:', res.status);
      console.log('Response Status Text:', res.statusText);
      throw new Error('Failed to fetch cart');
    }

const order = await res.json();
order.ordered = true;

const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
  method: 'PATCH',
  headers: {
    'Authorization': `${token}`, // Include token for authentication
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(order) // Set the `ordered` status to true
});

if (!response.ok) {
  throw new Error(`Error completing the order: ${response.statusText}`);
}

// Show success alert
alert('The order will be sent to your address');

// Fetch the updated cart
await fetchCart();
} catch (error) {
console.error('Error processing payment:', error);
}
}


async function updateCart() {
  try {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:8080/orders/get-my-cart', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ items: cart })
    });
  } catch (error) {
    console.error('Error updating cart:', error);
  }
}

async function clearCart() {
  try {
    const token = localStorage.getItem('token');
    const orderId = localStorage.getItem('orderId');

    // Loop through each item in the cart and send a DELETE request
    for (const item of cart) {
      const response = await fetch(`http://localhost:8080/orders/${orderId}/clean-cart`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`, // Include token for authentication
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error deleting product ${item.id}: ${response.statusText}`);
      }
    }

    // Clear the cart locally and re-render
    cart = [];
    renderCart();
  } catch (error) {
    console.error('Error clearing the cart:', error);
  }
}

fetchProducts();
fetchCart();
