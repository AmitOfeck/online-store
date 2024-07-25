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

    console.log('Form Data:', formData);

    try {
        const response = await fetch('http://localhost:8080/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        });

        console.log('Response Status:', response.status);
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        if (response.ok) {
            alert('Product created successfully');
            window.open(`/products/${responseData._id}`, '_blank');
        } else {
            alert(`Error: ${responseData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to create item');
    }
});

localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjhkYWY3NjlhMzZlZTQ2NDQ4Y2M3M2MiLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MjE5MzEzNDAsImV4cCI6MTcyMTkzNDk0MH0.134DnkkQrkrOWdJ4dVzrqafSue82acjmjTrIW_qVot4")