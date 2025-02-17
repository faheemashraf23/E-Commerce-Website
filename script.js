// Initialize cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;

// Function to add product to cart
function addToCart(product, price) {
    // Create a cart item object
    const cartItem = {
        product: product,
        price: parseFloat(price)
    };

    // Add item to cart
    cart.push(cartItem);
    cartCount++;
    updateCart();
}

// Function to update cart display
function updateCart() {
    // Update cart count
    document.getElementById('cart-count').innerText = cartCount;

    // Update cart items in modal
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Clear previous items

    let total = 0;

    // Loop through cart items and display them
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `${item.product} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    // Update total price
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

// Event listener for add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        const price = this.getAttribute('data-price');
        addToCart(product, price);

        // Save cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product} has been added to your cart!`);
    });
});

// Contact form submission handling
const scriptURL = 'https://script.google.com/macros/s/AKfycbwdBeAo5M02XmaVT5oEyZVTIBIhHnb0ayNIYwr0u0DNkpahVishGZtswPyHLDqvAhZS/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! Form is submitted"))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message));
});

// Initial update of cart display
updateCart();