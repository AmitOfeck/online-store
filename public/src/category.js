document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'reglog.html'; // Redirect to the login page if not authenticated
  }

  fetchAllProducts()
  fetchProducts(); // Fetch products on page load
  fetchCart(); // Fetch cart on page load

  // Add event listener for dropdown menu items
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      dropdownItems.forEach(i => i.classList.remove('active')); // Remove active class from all items
      this.classList.add('active'); // Add active class to the selected item
      filterProducts();
    });
  });

  // Add event listener for price filter button
  document.getElementById('apply-price-filter').addEventListener('click', function() {
    filterProducts();
  });

  // Add event listener for search input
  document.getElementById('search-input').addEventListener('input', function() {
    filterProducts();
  });
});

let allProducts = [];
let products = [];
let cart = [];
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalSum = document.getElementById('total-sum');

async function fetchProducts() {
  try {
    const token = localStorage.getItem('token'); 

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const subCategory = urlParams.get('subCategory');
    console.log(category)
    console.log(subCategory)

    let query = 'http://localhost:8080/products/search?';

    if (category) {
      query += `category=${category}&`;
    }
  
    if (subCategory) {
      query += `subCategory=${subCategory}&`;
    }

    query = query.slice(-1) === '&' || query.slice(-1) === '?' ? query.slice(0, -1) : query;

    console.log(query)

    const response = await fetch(query, {
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
    //console.log(products)
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}


async function fetchAllProducts() {
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

    allProducts = await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}


async function filterProducts() {
  // Get selected category from the active dropdown item
  const categoryDropdown = document.getElementById('categoryDropdownMenu');
  const selectedCategoryElement = categoryDropdown.querySelector('a.active');
  const category = selectedCategoryElement ? selectedCategoryElement.getAttribute('data-category') : '';

  // Get price range
  const maxPrice = parseFloat(document.getElementById('max-price').value) ;

  //console.log(maxPrice)

  // Get search query
  const searchName = document.getElementById('search-input').value.toLowerCase();

  let query = 'http://localhost:8080/products/search?';

  if (category) {
    query += `category=${category}&`;
  }

  if (maxPrice) {
    query += `price=<${maxPrice}&`;
  }

  if (searchName) {
    query += `name=${searchName}&`;
  }

  // Remove trailing '&' or '?' if no parameters are present
  query = query.slice(-1) === '&' || query.slice(-1) === '?' ? query.slice(0, -1) : query;

  try {
    const response = await fetch(query, {
      method: 'GET',
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching filtered products: ${response.statusText}`);
    }

    const filteredProducts = await response.json();
    renderProducts(filteredProducts);
  } catch (error) {
    console.error('Error fetching filtered products:', error);
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

    const imgElement = productCard.querySelector('img');

   // Add an event listener to the img element
   imgElement.addEventListener('click', () => {
      window.location.href = `product/itempage-template.html?id=${product._id}`;
   });

    productList.appendChild(productCard);
  });
}

function renderCart() {
cartItems.innerHTML = '';
let sum = 0;


cart.forEach(item => {
const product = allProducts.find(p => p._id === item.id)

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
async function payNow() {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items to proceed.');
    return;
  }

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

    openSignatureModal();

    document.getElementById('saveSignature').addEventListener('click', async function() {
      closeSignatureModal();

      alert('Your payment was successful! The order will be with you soon.');

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

      // Fetch the updated cart
      await fetchCart();
    });
  } catch (error) {
    console.error('Error processing payment:', error);
  }
}

function openSignatureModal() {
  document.getElementById('signatureModal').style.display = 'block';

  const canvas = document.getElementById('signatureCanvas');
  const ctx = canvas.getContext('2d');

  let drawing = false;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }

  function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  function stopDrawing() {
    drawing = false;
  }
}

function closeSignatureModal() {
  document.getElementById('signatureModal').style.display = 'none';
  clearCanvas();
}

function clearCanvas() {
  const canvas = document.getElementById('signatureCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
  fetchProducts();
  fetchCart();  

  async function fetchIncomeData() {
    try {
      const response = await fetch('http://localhost:8080/orders/most-popular-products', {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching income data: ${response.statusText}`);
      }
  
      const incomeData = await response.json();
      renderIncomeChart(incomeData);
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
  }
  
  function renderIncomeChart(incomeData) {
    const margin = { top: 20, right: 30, bottom: 100, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    const svg = d3.select("#incomeChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleBand()
      .domain(incomeData.map(d => d.name || 'Unnamed'))
      .range([0, width])
      .padding(0.2);
  
    const y = d3.scaleLinear()
      .domain([0, d3.max(incomeData, d => d.totalQuantity)])
      .nice()
      .range([height, 0]);
  
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
  
    svg.append("g")
      .call(d3.axisLeft(y));
  
    svg.selectAll("rect")
      .data(incomeData)
      .enter()
      .append("rect")
      .attr("x", d => x(d.name || 'Unnamed'))
      .attr("y", d => y(d.totalQuantity))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.totalQuantity))
      .attr("fill", "rgba(75, 192, 192, 0.6)");
  
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top)
      .attr("transform", "rotate(-90)")
      .text("Quantity");
  
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Product");
  }
  
  // Fetch income data and render the chart on page load
  fetchIncomeData();