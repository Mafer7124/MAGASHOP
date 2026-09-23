const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyQU1_N-sZgk1E6lNLMYxd4V8fotAqykjbDeRSsi5RYxE4F8oHAnU24f2y6Uhrda0gR/exec";

const orderCheckoutButton = document.getElementById("checkoutButton");

if (orderCheckoutButton) {
    orderCheckoutButton.addEventListener(
        "click",
        () => {
            if (typeof cart === "undefined" || cart.length === 0) {
                return;
            }

            if (
                !WEB_APP_URL ||
                WEB_APP_URL === "PEGAR_AQUI_URL_DEL_APPS_SCRIPT"
            ) {
                console.warn(
                    "Google Sheets todavía no está conectado. Falta reemplazar WEB_APP_URL."
                );
                return;
            }

            const total = cart.reduce(
                (sum, product) =>
                    sum + (product.price * product.quantity),
                0
            );

            const orderData = {
                productos: cart
                    .map(product => product.name)
                    .join(", "),

                cantidades: cart
                    .map(product =>
                        `${product.name}: ${product.quantity}`
                    )
                    .join(" | "),

                total: total
            };

            fetch(WEB_APP_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(orderData),
                keepalive: true
            }).catch(error => {
                console.error(
                    "No se pudo registrar el pedido en Google Sheets:",
                    error
                );
            });
        },
        true
    );
}
