//const jwt = require('jsonwebtoken');

let map;
let marker;
let autocomplete;
let mapInitialized = false;
let selectedPlace = null;
let userId;
let userData; 

// Initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });

  const input = document.getElementById('pac-input');
  const searchBox = new google.maps.places.SearchBox(input);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener('bounds_changed', () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      if (marker) {
        marker.setMap(null);
      }

      marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      selectedPlace = place;

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  map.addListener('click', (event) => {
    placeMarker(event.latLng);
  });
}

function placeMarker(location) {
  if (marker) {
    marker.setPosition(location);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }
  document.getElementById('latitude').value = location.lat();
  document.getElementById('longitude').value = location.lng();
}

document.getElementById('saveLocation').addEventListener('click', () => {
  const lat = document.getElementById('latitude').value;
  const lng = document.getElementById('longitude').value;
  const locationName = selectedPlace ? selectedPlace.formatted_address : 'Unknown location';
  document.getElementById('location-name').value = locationName;
  document.getElementById('streetAddress').value = locationName; 
  alert(`Selected location: ${locationName}`);
});

$('#addressModal').on('shown.bs.modal', function () {
  if (!mapInitialized) {
    initMap();
    mapInitialized = true;
  }
});

// Fetch user details and populate the form
async function fetchUserDetails() {
  try {

    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);   

    const response = await fetch(`http://localhost:8080/users/${decoded.userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching user details');
    }

    userData = await response.json(); // Store user data
    userId = userData._id;
    document.getElementById('firstName').textContent = userData.firstName;
    document.getElementById('lastName').textContent = userData.lastName;
    document.getElementById('email').textContent = userData.email;
    document.getElementById('address').value = userData.streetAddress || '';
    document.getElementById('city').value = userData.city || '';
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}

// Fetch and render user orders
async function fetchUserOrders() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/orders/search?customerId=${userId}&ordered=true`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching user orders');
    }

    const orders = await response.json();
    renderOrders(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
  }
}

// Render user orders in the table
function renderOrders(orders) {
  const orderHistory = document.getElementById('orderHistory');
  let totalSpending = 0;
  orderHistory.innerHTML = '';
  orders.forEach(order => {
    if (order.ordered) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order._id}</td>
        <td>${order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}</td>
        <td>$${order.bill}</td>
      `;
      orderHistory.appendChild(row);
      //totalSpending += order.bill;
    }
  });
  //document.getElementById('totalSpending').textContent = totalSpending;
}

// Handle form submission
document.getElementById('customer-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const password = document.getElementById('password').value;
  const address = document.getElementById('streetAddress').value;
  const city = document.getElementById('city').value;
  const token = localStorage.getItem('token');


  // Update userData with new values
  if (password) userData.password = password;
  if (address) userData.streetAddress = address;
  if (city) userData.city = city;

  console.log(userData)

  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Error updating user details');
    }

    alert('Changes saved!');
  } catch (error) {
    console.error('Error updating user details:', error);
  }
});

// Change city handler
function changeCity() {
  const cityInput = document.getElementById('city');
  const newCity = prompt('Enter new city:');
  if (newCity) {
    cityInput.value = newCity;
  }
}

async function fetchTotalSpending() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/orders/aggregate/total-bill-by-customer/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching total spending');
    }


    const result = await response.json();
    const totalSpending = result.length > 0 ? result[0].totalBill : 0; // Check if result array has data
    document.getElementById('totalSpending').textContent = totalSpending;
  } catch (error) {
    console.error('Error fetching total spending:', error);
  }
}

// Initialize the portal
async function initPortal() {
  await fetchUserDetails();
  await fetchUserOrders();
  await fetchTotalSpending();
}

// Initial render
initPortal();

