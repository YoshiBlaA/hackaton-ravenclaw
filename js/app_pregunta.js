// Comprueba cuál opción seleccionó el usuario
function comprobarRespuesta(respuesta) {

    // Busca dónde mostraremos el resultado
    const resultado =
        document.getElementById("resultado");

    // Busca el botón para entrar a Ravenclaw
    const botonEntrar =
        document.getElementById("botonEntrar");


    // Águila es la respuesta correcta
    if (respuesta === "aguila") {

        // Muestra mensaje correcto
        resultado.textContent =
            "✨ ¡Respuesta correcta! Bienvenida a Ravenclaw.";

        // Cambia el mensaje a verde
        resultado.style.backgroundColor = "#dff5e1";
        resultado.style.color = "#176b2c";

        // Muestra el botón para continuar
        botonEntrar.style.display = "inline-block";

    } else {

        // Muestra mensaje incorrecto
        resultado.textContent =
            "❌ Respuesta incorrecta. Intenta nuevamente.";

        // Cambia el mensaje a rojo
        resultado.style.backgroundColor = "#ffdede";
        resultado.style.color = "#a40000";

        // Si responde mal no puede continuar
        botonEntrar.style.display = "none";
    }
}


// Cambia de la pregunta al mensaje de bienvenida
function entrarRavenclaw() {

    // Primera pantalla
    const bienvenida =
        document.getElementById("bienvenida");

    // Segunda pantalla
    const mensajeBienvenida =
        document.getElementById("mensajeBienvenida");

    // Oculta las preguntas
    bienvenida.style.display = "none";

    // Muestra la bienvenida final
    mensajeBienvenida.style.display = "flex";
}