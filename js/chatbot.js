const chatbotToggle =
    document.getElementById("chatbotToggle");

const chatbotPanel =
    document.getElementById("chatbotPanel");

const closeChatbot =
    document.getElementById("closeChatbot");

const clearChat =
    document.getElementById("clearChat");

const chatInput =
    document.getElementById("chatInput");

const sendMessage =
    document.getElementById("sendMessage");

const chatbotMessages =
    document.getElementById("chatbotMessages");

const typingIndicator =
    document.getElementById("typingIndicator");

const suggestionButtons =
    document.querySelectorAll(
        ".chatbot-suggestions button"
    );


chatbotToggle.addEventListener("click", () => {

    chatbotPanel.classList.toggle("active");

});


closeChatbot.addEventListener("click", () => {

    chatbotPanel.classList.remove("active");

});


sendMessage.addEventListener("click", () => {

    processMessage();

});


chatInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        processMessage();

    }

});


suggestionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const question =
            button.dataset.question;

        chatInput.value = question;

        processMessage();

    });

});


clearChat.addEventListener("click", () => {

    chatbotMessages.innerHTML = `
        <div class="bot-message">
            ¡Hola! Soy el asistente de MAGASHOP.
            ¿En qué puedo ayudarte?
        </div>
    `;

});


function processMessage() {

    const message =
        chatInput.value.trim();

    if (!message) {
        return;
    }


    addMessage(message, "user");

    chatInput.value = "";


    typingIndicator.style.display = "block";


    setTimeout(() => {

        typingIndicator.style.display = "none";

        const response =
            getResponse(message);

        addMessage(response, "bot");

    }, 600);

}


function addMessage(text, sender) {

    const message =
        document.createElement("div");

    message.classList.add(
        sender === "user"
            ? "user-message"
            : "bot-message"
    );

    message.textContent = text;

    chatbotMessages.appendChild(message);


    chatbotMessages.scrollTop =
        chatbotMessages.scrollHeight;

}


function getResponse(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("comprar") ||
        text.includes("pedido") ||
        text.includes("carrito")
    ) {

        return "Para realizar un pedido, agrega tus pines al carrito y presiona el botón de realizar pedido. El resumen será enviado directamente a MAGASHOP por WhatsApp.";

    }
    if (
        text.includes("disponible") ||
        text.includes("disponibilidad") ||
        text.includes("existencia") ||
        text.includes("hay")
    ) {

        return "La disponibilidad de los pines puede variar. Puedes agregar el producto a tu carrito y consultar con MAGASHOP por WhatsApp para confirmar existencia.";

    }


    if (
        text.includes("pago") ||
        text.includes("transferencia") ||
        text.includes("efectivo")
    ) {

        return "MAGASHOP acepta pagos mediante transferencia y efectivo.";

    }


    if (
        text.includes("devolución") ||
        text.includes("devolucion") ||
        text.includes("cambio")
    ) {

        return "MAGASHOP no acepta cambios ni devoluciones. Si pagarás en efectivo y necesitas cambio, debes indicarlo con anticipación.";

    }


    if (
        text.includes("entrega") ||
        text.includes("espera") ||
        text.includes("puntual")
    ) {

        return "Para las entregas se solicita puntualidad. El tiempo máximo de espera es de 20 minutos.";

    }


    if (
        text.includes("precio") ||
        text.includes("cuesta") ||
        text.includes("costo")
    ) {

        return "Puedes consultar los precios disponibles directamente en la sección Catálogo.";

    }


    if (
        text.includes("contacto") ||
        text.includes("whatsapp") ||
        text.includes("teléfono") ||
        text.includes("telefono")
    ) {

        return "Puedes comunicarte con MAGASHOP por WhatsApp al 8958-2627.";

    }


    return "No tengo información suficiente sobre esa consulta. Puedes comunicarte directamente con MAGASHOP por WhatsApp al 8958-2627.";

}


