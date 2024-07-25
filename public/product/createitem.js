document.getElementById('create-item-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        currentStock: parseInt(document.getElementById('product-currentStock').value, 10),
        image: document.getElementById('product-image').value,
        subCategory: document.getElementById('product-subCategory').value,
        weight: parseFloat(document.getElementById('product-weight').value),
        weightUnit: document.getElementById('product-weightUnit').value,
        supplierId: document.getElementById('product-supplierId').value,
        manufacturer: document.getElementById('product-manufacturer').value
    };

    console.log(formData)
   
    try {
        const response = await fetch('http://localhost:8080/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // אם אתה משתמש בטוקן
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            alert('Product created successfully');
            // Open new window with the product page
            window.open(`/products/${data._id}`, '_blank');
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to create item');
    }
});

localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjhkYWY3NjlhMzZlZTQ2NDQ4Y2M3M2MiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MjE3NzI4NDUsImV4cCI6MTcyMTc3NjQ0NX0.e37UG3lM6EbI99omliu4L1UlE3sMuH4b7pAZ8bMSU4A")