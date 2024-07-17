document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.imagen-fondo img');
    let indice = 0;

    function cambiarImagen() {
        imagenes.forEach(img => img.style.opacity = 0);
        imagenes[indice].style.opacity = 1;
        indice = (indice + 1) % imagenes.length;
    }

    cambiarImagen();

    setInterval(cambiarImagen, 5000);
});

// perfumes 
/*
const itemList = document.querySelector('.item-list');
const gridViewBtn = document.getElementById('grid-active-btn');
const detailsViewBtn = document.getElementById('details-active-btn');

gridViewBtn.classList.add('active-btn');

gridViewBtn.addEventListener('click', () => {
    gridViewBtn.classList.add('active-btn');
    detailsViewBtn.classList.remove('active-btn');
    itemList.classList.remove('details-active');
});

detailsViewBtn.addEventListener('click', () => {
    detailsViewBtn.classList.add('active-btn');
    gridViewBtn.classList.remove("active-btn");
    itemList.classList.add("details-active");
});
*/


// carrito de compra

let cart = [];

function showPerfumes(category) {
    const categories = ['damas', 'hombres', 'damas200', 'hombres200', 'estuchedama', 'estuchecaballero'];
    categories.forEach(cat => {
        document.getElementById(cat).style.display = (cat === category) ? '' : 'none';
    });
}

function showAll() {
    const categories = ['damas', 'hombres', 'damas200', 'hombres200', 'estuchedama', 'estuchecaballero'];
    categories.forEach(cat => {
        document.getElementById(cat).style.display = '';
    });
}

function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.style.display = cartElement.style.display === 'none' ? 'block' : 'none';
    updateCart();
}

function addToCart(image, price) {
    cart.push({ image, price });
    updateCart();
    if (document.getElementById('cart').style.display === 'block') {
        toggleCart();
        toggleCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    if (cart.length === 0) {
        toggleCart();
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `<img src="${item.image}" alt="Producto"><span>$${item.price}</span>
                                <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });

    const itbms = total * 0.07;
    const totalWithItbms = total + itbms;

    document.getElementById('cart-total').innerText = total.toFixed(2);
    document.getElementById('cart-itbms').innerText = itbms.toFixed(2);
    document.getElementById('cart-total-itbms').innerText = totalWithItbms.toFixed(2);
}

function toggleCheckoutForm() {
    const form = document.getElementById('checkout-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function toggleCardFields() {
    const paymentMethod = document.getElementById('payment-method').value;
    const cardFields = document.getElementById('card-fields');
    cardFields.style.display = paymentMethod === 'card' ? 'block' : 'none';

    const cardInputs = cardFields.querySelectorAll('input');
    cardInputs.forEach(input => input.required = paymentMethod === 'card');
}

function submitOrder(event) {
    event.preventDefault();
    const paymentMethod = document.getElementById('payment-method').value;

    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCVV = document.getElementById('card-cvv').value;

        if (!cardNumber || !cardExpiry || !cardCVV) {
            alert('Por favor, complete todos los campos de la tarjeta.');
            return;
        }
    }

    alert('Pedido confirmado. ¡Gracias por su compra!');
    finalizeOrder();
}

function finalizeOrder() {
    const paymentMethod = document.getElementById('payment-method').value;

    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCVV = document.getElementById('card-cvv').value;

        if (!cardNumber || !cardExpiry || !cardCVV) {
            alert('Por favor, complete todos los campos de la tarjeta.');
            return;
        }
    }

    if (!document.getElementById('name').value || !document.getElementById('address').value) {
        alert('Por favor, complete los campos de nombre y dirección.');
        return;
    }

    alert('Pedido finalizado. ¡Gracias por su compra!');
    cart = [];
    updateCart();
    toggleCart();
    toggleCheckoutForm();
}