function comprobarRespuesta(respuesta) {
    const resultado =
        document.getElementById("resultado");
    const botonEntrar =
        document.getElementById("botonEntrar");

    // Águila es la respuesta correcta
    if (respuesta === "aguila") {
        resultado.textContent =
            "✨ ¡Respuesta correcta! Bienvenida a Ravenclaw.";
        resultado.style.backgroundColor =
            "#dff5e1";
        resultado.style.color =
            "#176b2c";
        // Muestra el botón para continuar
        botonEntrar.style.display =
            "inline-block";

    } else {
        resultado.textContent =
            "❌ Respuesta incorrecta. Intenta nuevamente.";
        resultado.style.backgroundColor =
            "#ffdede";
        resultado.style.color =
            "#a40000";
        // Si responde mal, no puede entrar
        botonEntrar.style.display =
            "none";

    }

}

// Cambia de la pregunta a la bienvenida
function entrarRavenclaw() {
    const bienvenida =
        document.getElementById("bienvenida");
    const mensajeBienvenida =
        document.getElementById("mensajeBienvenida");
    // Oculta la pantalla de la pregunta
    bienvenida.style.display =
        "none";
    // Muestra la pantalla de bienvenida
    mensajeBienvenida.style.display =
        "flex";
}

// Por ahora muestra un mensaje
function continuarAventura() {
    alert(
        "🦅 ¡Bienvenida! Ahora puedes continuar al sitio de Ravenclaw."
    );

}