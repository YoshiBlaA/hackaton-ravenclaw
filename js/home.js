
// ========================================
// BUSCADOR DEL NAVBAR
// ========================================

// Obtenemos el formulario del buscador mediante su ID
const formulario = document.getElementById("form-buscador");

// Obtenemos el campo donde el usuario escribe su búsqueda
const buscador = document.getElementById("buscador");

// Escuchamos el evento "submit" del formulario
// Este evento ocurre cuando el usuario presiona el botón de buscar
// o presiona Enter dentro del input
formulario.addEventListener("submit", function (event) {

    // Evita que el formulario recargue la página automáticamente
    event.preventDefault();

    // Obtenemos el texto escrito por el usuario
    // trim() elimina espacios al inicio y al final
    // toLowerCase() convierte el texto a minúsculas
    // para facilitar la comparación
    const busqueda = buscador.value.trim().toLowerCase();

    // ========================================
    // REDIRECCIÓN SEGÚN LA BÚSQUEDA
    // ========================================

    // Si el usuario busca "varitas"
    // lo enviamos a la sección de varitas de la tienda
    if (busqueda === "varitas") {
        window.location.href = "store.html#category-varitas";

    // Si el usuario busca "pociones"
    // lo enviamos a la sección de pociones
    } else if (busqueda === "pociones") {
        window.location.href = "store.html#category-pociones";

    // Si el usuario busca "hechizos"
    // lo enviamos a la sección de hechizos
    } else if (busqueda === "hechizos") {
        window.location.href = "store.html#category-hechizos";

    // Si no coincide con ninguna categoría
    // mostramos un mensaje al usuario
    } else {
        alert("No encontramos lo que estás buscando.");
    }

});