const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");
const views = document.querySelectorAll(".view");


// MENÚ MÓVIL

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

}


// FUNCIÓN PARA CAMBIAR ENTRE VISTAS

function openView(viewName) {

    // Ocultar todas las vistas
    views.forEach(view => {
        view.classList.remove("active");
    });


    // Mostrar la vista seleccionada
    const selectedView = document.getElementById(viewName);

    if (selectedView) {
        selectedView.classList.add("active");
    }


    // Quitar estado activo del menú
    navLinks.forEach(link => {
        link.classList.remove("active");
    });


    // Marcar el enlace correspondiente
    const activeLink = document.querySelector(
        `[data-view="${viewName}"]`
    );

    if (activeLink) {
        activeLink.classList.add("active");
    }


    // Cerrar menú móvil
    if (navMenu) {
        navMenu.classList.remove("open");
    }


    // Subir al inicio de la página
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// NAVEGACIÓN PRINCIPAL

navLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const viewName = link.dataset.view;

        if (!viewName) {
            return;
        }

        openView(viewName);

    });

});


// BOTONES QUE CAMBIAN DE VISTA

const viewButtons =
    document.querySelectorAll("[data-view-target]");

viewButtons.forEach(button => {

    button.addEventListener("click", () => {

        const viewName =
            button.dataset.viewTarget;

        if (!viewName) {
            return;
        }

        openView(viewName);

    });

});


// BOTÓN DEL HERO → CONTACTO

const heroContactButton =
    document.querySelector(".hero-contact-button");

if (heroContactButton) {

    heroContactButton.addEventListener("click", event => {

        event.preventDefault();

        openView("contacto");

    });

}


// CERRAR MENÚ SI SE CAMBIA A ESCRITORIO

window.addEventListener("resize", () => {

    if (window.innerWidth > 850 && navMenu) {
        navMenu.classList.remove("open");
    }

});