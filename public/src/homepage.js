document.addEventListener("DOMContentLoaded", function() {
  const token = localStorage.getItem('token');
  console.log("Token:", token);

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      const userType = decodedToken.type;
      console.log("Decoded Token:", decodedToken);
      console.log("User Type:", userType);
      updateNavbar(userType);
      fetchCart(); // Fetch the cart details
    } catch (error) {
      console.error("Error decoding token:", error);
      updateNavbar(null); // Handle token decoding error
    }
  } else {
    updateNavbar(null); // Handle no token case
  }
});



function updateNavbar(userType) {
  let navbarContent = '';

  switch (userType) {
    case 'customer':
      navbarContent = `
        <div class="container-fluid">
          <div class="navbar-brand">
            <button class="btn btn-filter" id="logoutButton">Log Out</button>
            <button class="btn btn-filter"><a href="Personal_Portal.html" class="login_btn">Personal Portal</a></button>
          </div>
          <div class="navbar-nav">
            <div class="nav-item">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search in Super Eats">
              </div>
            </div>
          </div>
          <div class="nav-right">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-list"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <a class="Cat">Menu</a>
                <li><a class="dropdown-item" href="#"><img src="Pictures/milk-dairy-icon.jpg" class="icon"> Dairy and Eggs</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/fruit-icon.jpg" class="icon"> Fruit and Vegetables</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/fish-meat-icon.jpg" class="icon"> Meat and Fish</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/sweetandsalty-icon.jpg" class="icon"> Sweet & Salty</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/drink-icon.jpg" class="icon"> Beverages</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/frozen-icon.jpg" class="icon"> Frozen Produce</a></li>
              </ul>
            </div>
            <a class="navbar-brand" href="#">
              <img src="Pictures/logo.jpg" alt="Logo">
            </a>
          </div>
        </div>
      `;
      break;
    case 'admin':
      navbarContent = `
        <div class="container-fluid">
          <div class="navbar-brand">
            <button class="btn btn-filter" id="logoutButton">Log Out</button>
            <button class="btn btn-filter"><a href="Personal_Portal.html" class="login_btn">Personal Portal</a></button>
            <button class="btn btn-filter"><a href="user-managment.html" class="login_btn">User Management</a></button>
            <button class="btn btn-filter"><a href="orders_Managment.html" class="login_btn">Order Management</a></button>
          </div>
          <div class="navbar-nav">
            <div class="nav-item">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search in Super Eats">
              </div>
            </div>
          </div>
          <div class="nav-right">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-list"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <a class="Cat">Menu</a>
                <li><a class="dropdown-item" href="#"><img src="Pictures/milk-dairy-icon.jpg" class="icon"> Dairy and Eggs</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/fruit-icon.jpg" class="icon"> Fruit and Vegetables</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/fish-meat-icon.jpg" class="icon"> Meat and Fish</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/sweetandsalty-icon.jpg" class="icon"> Sweet & Salty</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/drink-icon.jpg" class="icon"> Beverages</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/frozen-icon.jpg" class="icon"> Frozen Produce</a></li>
              </ul>
            </div>
            <a class="navbar-brand" href="#">
              <img src="Pictures/logo.jpg" alt="Logo">
            </a>
          </div>
        </div>
      `;
      break;
    case 'supplier':
      navbarContent = `
        <div class="container-fluid">
          <div class="navbar-brand">
            <button class="btn btn-filter" id="logoutButton">Log Out</button>
            <button class="btn btn-filter"><a href="Personal_Portal.html" class="login_btn">Personal Portal</a></button>
            <button class="btn btn-filter"><a href="Product-mangment.html" class="login_btn">Manage Products</a></button>
          </div>
          <div class="navbar-nav">
            <div class="nav-item">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search in Super Eats">
              </div>
            </div>
          </div>
          <div class="nav-right">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-list"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <a class="Cat">Menu</a>
                <li><a class="dropdown-item" href="#"><img src="Pictures/milk-dairy-icon.jpg" class="icon"> Dairy and Eggs</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/fruit-icon.jpg" class="icon"> Fruit and Vegetables</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/fish-meat-icon.jpg" class="icon"> Meat and Fish</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/sweetandsalty-icon.jpg" class="icon"> Sweet & Salty</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/drink-icon.jpg" class="icon"> Beverages</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/frozen-icon.jpg" class="icon"> Frozen Produce</a></li>
              </ul>
            </div>
            <a class="navbar-brand" href="#">
              <img src="Pictures/logo.jpg" alt="Logo">
            </a>
          </div>
        </div>
      `;
      break;
    default:
      navbarContent = `
        <div class="container-fluid">
          <div class="navbar-brand">
            <button class="btn btn-filter"><a href="reglog.html" class="login_btn">Log In</a></button>
          </div>
          <div class="navbar-nav">
            <div class="nav-item">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search in Super Eats">
              </div>
            </div>
          </div>
          <div class="nav-right">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-list"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <a class="Cat">Menu</a>
                <li><a class="dropdown-item" href="#"><img src="Pictures/milk-dairy-icon.jpg" class="icon"> Dairy and Eggs</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/fruit-icon.jpg" class="icon"> Fruit and Vegetables</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/fish-meat-icon.jpg" class="icon"> Meat and Fish</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/sweetandsalty-icon.jpg" class="icon"> Sweet & Salty</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/drink-icon.jpg" class="icon"> Beverages</a></li>
                <li><a class="dropdown-item" href="#"><img src="Pictures/frozen-icon.jpg" class="icon"> Frozen Produce</a></li>
              </ul>
            </div>
            <a class="navbar-brand" href="#">
              <img src="Pictures/logo.jpg" alt="Logo">
            </a>
          </div>
        </div>
      `;
      break;
  }

  document.getElementById('navbar').innerHTML = navbarContent;

  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.clear();
      location.reload();
    });
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
const product = products.find(p => p._id === item.id)

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

document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.clear();
  });

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


  
  fetchCart();  

