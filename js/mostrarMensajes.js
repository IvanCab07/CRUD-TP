function mostrarMensaje(mensaje) {
    const contenedor = document.querySelector(".mensajes");
    contenedor.innerHTML = mensaje;
    contenedor.style.display = "block";
    setTimeout(() => contenedor.style.display = "none", 2000);
}
