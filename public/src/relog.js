document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

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
        //alert('Login successful');
        window.location.href = 'homepage.html';
    } else {
        alert('Login failed: ' + data.error);
    }
});


document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const type = document.getElementById('registerType').value;
    const streetAddress = document.getElementById('registerStreet').value;
    const city = document.getElementById('registerCity').value;

    
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
    } else {
        alert('Registration failed: ' + data.error);
    }
    
});
