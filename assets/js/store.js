document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('store-category-select');
    const categories = {
        'rank': document.getElementById('rank-category'),
        'money': document.getElementById('money-category'),
        'shards': document.getElementById('shards-category'),
        'server-access': document.getElementById('server-access-category')
    };

    categorySelect.addEventListener('change', function() {
        // Hide all categories
        Object.values(categories).forEach(category => {
            category.style.display = 'none';
        });

        // Show selected category
        const selectedCategory = categories[this.value];
        if (selectedCategory) {
            selectedCategory.style.display = 'block';
        }
    });
});
