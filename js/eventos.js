document.addEventListener("DOMContentLoaded", () => {

    mostrarPersonas();

    // Agregar
    document.querySelector("#btn-agregar").addEventListener("click", () => {
        document.querySelector("#form-agregar").style.display = "block";
    });

    document.querySelector(".btn-cerrar-formAgregar").addEventListener("click", () => {
        document.querySelector("#form-agregar").style.display = "none";
    });

    const formAgregar = document.querySelector("#form-agregar");
    formAgregar.addEventListener("submit", (event) => {
        event.preventDefault();
        agregarPersona({
            nombre: formAgregar.nombre.value,
            edad: formAgregar.edad.value,
            dni: formAgregar.dni.value
        });
        formAgregar.reset();
        formAgregar.style.display = "none";
        mostrarPersonas();
    });

    // Buscar
    const formBuscar = document.querySelector("#form-buscar");
    formBuscar.addEventListener("submit", (event) => {
        event.preventDefault();
        const resultados = buscarPersonas(formBuscar.nombre.value, formBuscar.dni.value);
        mostrarPersonas(resultados);
    });

    document.querySelector("#btn-filtros").addEventListener("click", () => {
        formBuscar.reset();
        mostrarPersonas();
    });

    // Modificar
    document.querySelector(".btn-cerrar-formModif").addEventListener("click", () => {
        document.querySelector("#form-modificar").style.display = "none";
    });

    const formModificar = document.querySelector("#form-modificar");
    formModificar.addEventListener("submit", (event) => {
        event.preventDefault();
        modificarPersona({
            nombre: formModificar.nombre.value,
            edad: formModificar.edad.value,
            dni: formModificar.dni.value
        });
        formModificar.reset();
        formModificar.style.display = "none";
        mostrarPersonas();
    });

});
