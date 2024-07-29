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
          <td>${user.firstName}</td>
          <td>${user.lastName}</td>
          <td>${user.userId}</td>
          <td>${user.email}</td>
          <td><button class="btn btn-danger btn-sm" onclick="deleteUser('${user.userId}')"><i class="bi bi-x"></i></button></td>
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
        users = users.filter(user => user.userId !== userId);
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