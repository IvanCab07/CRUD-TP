// Muestra un mensaje temporal en el area de mensajes del DOM
const mostrarMensaje = (mensaje) => {
    const contenedorMensajes = document.querySelector(".mensajes");
    contenedorMensajes.style.display = 'block';
    contenedorMensajes.innerHTML = mensaje;
    setTimeout(() => { contenedorMensajes.style.display = 'none'; }, 2000);
}