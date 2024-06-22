document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: "Smartphone", category: "Electronics", price: 299.99, image: "images/smartphone-image.png", description: "A high-quality smartphone with the latest features." },
        { name: "Laptop", category: "Electronics", price: 899.99, image: "images/laptop-image.png", description: "A powerful laptop for all your work and gaming needs." },
        { name: "Jeans", category: "Clothing", price: 49.99, image: "images/jeans-image.jpg", description: "Comfortable and stylish jeans for everyday wear." },
        { name: "T-Shirt", category: "Clothing", price: 19.99, image: "images/t-shirt-image.png", description: "A classic t-shirt made from soft, breathable fabric." },
        { name: "Novel", category: "Books", price: 14.99, image: "images/novel-image.jpg", description: "An engaging novel that will keep you hooked till the end." },
        { name: "Science Fiction", category: "Books", price: 24.99, image: "images/science-fiction-image.png", description: "A thrilling science fiction book with mind-bending plots." },
        { name: "Headphones", category: "Electronics", price: 199.99, image: "images/headphone-image.png", description: "High-fidelity headphones with noise-cancelling capabilities." },
        { name: "Jacket", category: "Clothing", price: 79.99, image: "images/leather-jacket-image.jpeg", description: "A stylish leather jacket perfect for any occasion." },
        { name: "Glasses", category: "Accessories", price: 29.99, image: "images/glasses-image.png", description: "Fashionable glasses that combine style and function." },
        { name: "Watch", category: "Electronics", price: 149.99, image: "images/apple-watch-image.png", description: "A smartwatch with all the features you need to stay connected." },
        { name: "Sneakers", category: "Clothing", price: 59.99, image: "images/sneakers-image.png", description: "Comfortable and stylish sneakers for everyday wear." },
        { name: "Biography", category: "Books", price: 19.99, image: "images/book-image.png", description: "A captivating biography of a notable figure." }
    ];

    let cartCount = 0;
    const cartItems = [];
    const productContainer = document.getElementById('product_list');
    const searchInput = document.getElementById('search_input');
    const categoryFilter = document.getElementById('category_filter');
    const sortDropdown = document.getElementById('sort');
    const cartCountElement = document.getElementById('cart_count');
    const cartIcon = document.getElementById('cart_icon');
    const cartModal = document.getElementById('cart_modal');
    const cartItemsContainer = document.getElementById('cart_items');
    const closeCartButton = document.getElementById('close_cart');

    function renderProducts(filteredProducts) {
        productContainer.innerHTML = '';
        filteredProducts.forEach((product, index) => {
            const productElement = `
                <div class="product-card border rounded-md p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover mb-4 cursor-pointer">
                    <h2 class="text-xl font-bold">${product.name}</h2>
                    <p class="text-gray-700">${product.category}</p>
                    <p class="text-gray-900 font-bold">$${product.price.toFixed(2)}</p>
                    <p class="text-gray-600">${product.description}</p>
                    <button class="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 add-to-cart">Add to Cart</button>
                </div>
            `;
            const productCard = document.createElement('div');
            productCard.classList.add('relative');
            productCard.innerHTML = productElement;
            
            // Add click event to toggle card details
            const cardImage = productCard.querySelector('img');
            cardImage.addEventListener('click', () => {
                toggleProductDetails(productCard, product, index);
            });

            productContainer.appendChild(productCard);
        });

        document.querySelectorAll('.add-to-cart').forEach((button, index) => {
            button.addEventListener('click', () => {
                cartCount++;
                cartCountElement.textContent = cartCount;
                cartItems.push(products[index]);
                renderCartItems();
            });
        });
    }

    function toggleProductDetails(productCard, product, index) {
        const isOpen = productCard.classList.toggle('open');
        
        if (isOpen) {
            const detailsElement = `
                <div class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                    <div class="max-w-lg mx-auto p-4">
                        <h2 class="text-2xl font-bold">${product.name}</h2>
                        <p class="text-gray-700">${product.category}</p>
                        <p class="text-gray-900 font-bold">$${product.price.toFixed(2)}</p>
                        <p class="text-gray-600">${product.description}</p>
                        <button class="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;
            productCard.insertAdjacentHTML('beforeend', detailsElement);

            // Add click event to close details on overlay click
            const overlay = productCard.querySelector('.absolute');
            overlay.addEventListener('click', () => {
                toggleProductDetails(productCard, product, index);
            });
        } else {
            productCard.querySelector('.absolute').remove();
        }
    }

    function filterProducts() {
        let filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
            (categoryFilter.value === '' || product.category === categoryFilter.value)
        );

        if (sortDropdown.value === 'low-high') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortDropdown.value === 'high-low') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        renderProducts(filteredProducts);
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItemElement = `
                <div class="flex items-center space-x-4">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover">
                    <div class="flex-1">
                        <h3 class="text-lg font-bold">${item.name}</h3>
                        <p class="text-gray-600">${item.category}</p>
                        <p class="text-gray-900 font-bold">$${item.price.toFixed(2)}</p>
                    </div>
                    <button class="text-red-500 remove-item" data-index="${index}">&times;</button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemElement;
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                cartItems.splice(index, 1);
                cartCount--;
                cartCountElement.textContent = cartCount;
                renderCartItems();
            });
        });
    }

    cartIcon.addEventListener('click', () => {
        renderCartItems();
        cartModal.classList.remove('hidden');
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    sortDropdown.addEventListener('change', filterProducts);

    renderProducts(products);
});