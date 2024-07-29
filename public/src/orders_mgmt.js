function checkAdminAccess() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Access denied. No token found.');
      window.location.href = 'homepage.html';
      return;
    }
  
    try {
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);
      if (decodedToken.type !== 'admin') {
        alert('Access denied. Only admins can access this page.');
        window.location.href = 'homepage.html';
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      alert('Access denied. Invalid token.');
      window.location.href = 'homepage.html';
    }
  }
  
  const orderTable = document.getElementById('orderTable');
  const searchOrder = document.getElementById('searchOrder');
  const filterStatus = document.getElementById('filterStatus');
  const maxBill = document.getElementById('maxBill');
  const maxBillValue = document.getElementById('maxBillValue');
  let orders = []; // To store the fetched orders
  
  async function fetchOrders() {
    try {
      const response = await fetch('http://localhost:8080/orders/', {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
      }
  
      orders = await response.json();
      renderOrders(orders); // Initial rendering based on the fetched orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
  
  async function deleteOrder(orderId) {
    try {
      const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error deleting order: ${response.statusText}`);
      }
  
      // Remove the deleted order from the local orders array
      orders = orders.filter(order => order._id !== orderId);
      renderOrders(orders); // Re-render the orders after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  }
  
  function renderOrders(orders) {
    orderTable.innerHTML = '';
    orders.forEach(order => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order._id}</td>
        <td>${order.customerId}</td>
        <td>${order.ordered ? 'Ordered' : 'In Progress'}</td>
        <td>${order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</td>
        <td>$${order.bill}</td>
        <td>
          ${order.ordered ? `<button class="btn btn-danger btn-sm" onclick="deleteOrder('${order._id}')"><i class="bi bi-x"></i></button>` : ''}
        </td>
      `;
      orderTable.appendChild(row);
    });
  }
  
  async function filterByCustomerId() {
    
    const userId = searchOrder.value.toLowerCase();
    if (!userId) {
      renderOrders(orders);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/orders/search?customerId=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching filtered orders: ${response.statusText}`);
      }
  
      const filteredOrders = await response.json();
      renderOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching filtered orders:', error);
    }
  }
  
  async function filterByStatus() {
    const statusFilter = filterStatus.value;
  
    let query = 'http://localhost:8080/orders/search?';
    if (statusFilter !== 'all') {
      query += `ordered=${statusFilter === 'ordered'}`;
    }
  
    try {
      const response = await fetch(query, {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching filtered orders: ${response.statusText}`);
      }
  
      const filteredOrders = await response.json();
      renderOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching filtered orders:', error);
    }
  }
  
  async function filterByMaxBill() {
    const maxBillAmount = parseInt(maxBill.value) || 1000000;
  
    try {
      const response = await fetch(`http://localhost:8080/orders/search?maxBill=${maxBillAmount}`, {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching filtered orders: ${response.statusText}`);
      }
  
      const filteredOrders = await response.json();
      renderOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching filtered orders:', error);
    }
  }
  
  maxBill.addEventListener('input', () => {
    maxBillValue.textContent = maxBill.value;
    filterByMaxBill();
  });
  
  searchOrder.addEventListener('input', filterByCustomerId);
  filterStatus.addEventListener('change', filterByStatus);
  
  // Initial check for admin access
  checkAdminAccess();
  
  // Initial fetch and render
  fetchOrders();
  