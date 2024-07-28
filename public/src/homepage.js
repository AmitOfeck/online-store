document.addEventListener("DOMContentLoaded", function() {
  const token = localStorage.getItem('token');
  console.log("Token:", token); // Debug log

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      const userType = decodedToken.type;
      console.log("Decoded Token:", decodedToken); // Debug log
      console.log("User Type:", userType); // Debug log
      updateNavbar(userType);
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
            <button class="btn btn-address" data-bs-toggle="modal" data-bs-target="#addressModal">Address <i class="bi bi-geo-alt"></i></button>
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
            <button class="btn btn-filter"><a href="order-Managment.html" class="login_btn">Order Management</a></button>
            <button class="btn btn-address">Address <i class="bi bi-geo-alt"></i></button>
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
            <button class="btn btn-address" data-bs-toggle="modal" data-bs-target="#addressModal">Address <i class="bi bi-geo-alt"></i></button>
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
      // Handle case where userType is undefined or any other cases
      navbarContent = `
        <div class="container-fluid">
          <div class="navbar-brand">
            <button class="btn btn-filter"><a href="reglog.html" class="login_btn">Log In</a></button>
            <button class="btn btn-address" data-bs-toggle="modal" data-bs-target="#addressModal">Address <i class="bi bi-geo-alt"></i></button>
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

  console.log("Navbar Content:", navbarContent); // Debug log
  document.getElementById('navbar').innerHTML = navbarContent;

  // Add event listener for logout button
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.clear();
      location.reload();
    });
  }
}
