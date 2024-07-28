// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    console.log(email)
    console.log(password)

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'homepage.html';
        } else {
            alert('Login failed: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed: An unexpected error occurred.');
    }
});

// Handle register form submission
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const type = document.getElementById('registerType').value;
    const streetAddress = document.getElementById('registerStreet').value;
    const city = document.getElementById('registerCity').value;

    try {
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, type, firstName, lastName, streetAddress, city })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful');
            window.location.href = 'homepage.html';
        } else {
            alert('Registration failed: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed: An unexpected error occurred.');
    }
});
