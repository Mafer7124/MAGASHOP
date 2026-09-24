const cart = [];

const cartButton = document.querySelector(".cart-button");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.querySelector(".cart-count");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const addButtons = document.querySelectorAll(".add-cart");


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            product => product.name === name
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

    });

});


function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Tu carrito está vacío.</p>';

    } else {

        cart.forEach((product, index) => {

            const item = document.createElement("div");

            item.classList.add("cart-item");

            item.innerHTML = `
                <div class="cart-item-info">

                    <h4>${product.name}</h4>

                    <span>
                        L ${product.price} c/u
                    </span>

                    <div class="quantity-controls">

                        <button onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    onclick="removeProduct(${index})">

                    Eliminar

                </button>
            `;

            cartItems.appendChild(item);

        });

    }


    const quantityTotal = cart.reduce(
        (sum, product) => sum + product.quantity,
        0
    );

    cartCount.textContent = quantityTotal;


    const total = cart.reduce(
        (sum, product) =>
            sum + (product.price * product.quantity),
        0
    );

    cartTotal.textContent = `L ${total}`;
}


function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();
}


function removeProduct(index) {

    cart.splice(index, 1);

    updateCart();
}


function openCart() {

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
}


function hideCart() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
}


cartButton.addEventListener("click", openCart);

closeCart.addEventListener("click", hideCart);

cartOverlay.addEventListener("click", hideCart);



checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }


    let message =
        "Hola, quiero realizar un pedido en MAGASHOP:%0A%0A";


    cart.forEach(product => {

        const subtotal =
            product.price * product.quantity;

        message +=
            `${product.quantity} x ${product.name} - L ${subtotal}%0A`;

    });


    const total = cart.reduce(
        (sum, product) =>
            sum + (product.price * product.quantity),
        0
    );


    message += `%0A*Total: L ${total}*`;

    message +=
        "%0A%0AQuedo pendiente para confirmar disponibilidad y entrega.";


    const whatsappNumber = "50489582627";

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${message}`;


    window.open(whatsappURL, "_blank");

});