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

const userTable = document.getElementById('userTable');
    const searchUser = document.getElementById('searchUser');
    let users = [];

    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:8080/users/', {
          method: 'GET',
          headers: {
            'Authorization': `${localStorage.getItem('token')}`, // Include token for authentication
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }

        users = await response.json();
        renderUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    function renderUsers(users) {
      userTable.innerHTML = '';
      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="mt-4">${user.firstName}</td>
          <td class="mt-4">${user.lastName}</td>
          <td class="mt-4">${user._id}</td>
          <td class="mt-4">${user.email}</td>
          <td class="mt-4"><button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')"><i class="bi bi-x"></i></button></td>
        `;
        userTable.appendChild(row);
      });
    }

    async function deleteUser(userId) {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `${localStorage.getItem('token')}`, // Include token for authentication
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error deleting user ${userId}: ${response.statusText}`);
        }

        // Remove the user from the local list and re-render the table
        users = users.filter(user => user._id !== userId);
        renderUsers(users);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }

    searchUser.addEventListener('input', () => {
      const searchText = searchUser.value.toLowerCase();
      const filteredUsers = users.filter(user => 
        user.firstName.toLowerCase().includes(searchText) ||
        user.lastName.toLowerCase().includes(searchText) ||
        user.userId.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)
      );
      renderUsers(filteredUsers);
    });

    // Initial fetch and render
    fetchUsers();