function showSubCategories(id) {
    const subCategories = document.querySelectorAll('.sub-categories');
    subCategories.forEach(sub => {
        if (sub.id === id) {
           
            if (sub.style.display === 'block') {
                sub.style.display = 'none';
            } else {
                
                subCategories.forEach(other => {
                    if (other.id !== id) {
                        other.style.display = 'none';
                    }
                });
               
                sub.style.display = 'block';
            }
        } else {
            
            sub.style.display = 'none';
        }
    });
}






function showCategory(categoryName, subCategoryId) {
   
    if (subCategoryId) {
        document.querySelectorAll('.sub-categories').forEach(sub => {
            if (sub.id === subCategoryId) {
                sub.style.display = 'block';
            } else {
                sub.style.display = 'none';
            }
        });
    }

  
    document.getElementById('category-title').textContent = categoryName;
}


