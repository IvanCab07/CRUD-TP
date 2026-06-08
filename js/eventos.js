// Este archivo responde a los eventos del DOM,
// interactuando con el usuario y el modelo de datos desarrollado en modulos.js

document.addEventListener("DOMContentLoaded", () => {

    // Cargar listado de personas al iniciar
    mostrarPersonas();

    // ===================== FORMULARIO AGREGAR =====================

    // Mostrar formulario "Agregar Persona" desde el boton
    const btnAgregarPersona = document.querySelector("#btn-agregar");
    btnAgregarPersona.addEventListener("click", () => {
        document.querySelector("#form-agregar").style.display = "block";
    });

    // Ocultar formulario "Agregar persona" desde el boton cerrar (X)
    const btnCerrarFormAgregar = document.querySelector(".btn-cerrar-formAgregar");
    btnCerrarFormAgregar.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#form-agregar").style.display = "none";
    });

    // Evento submit del formulario "Agregar Persona"
    const formAgregar = document.querySelector("#form-agregar");
    formAgregar.addEventListener("submit", (event) => {
        event.preventDefault();
        const nuevaPersona = {
            nombre: formAgregar.nombre.value,
            edad: formAgregar.edad.value,
            dni: formAgregar.dni.value
        };
        agregarPersona(nuevaPersona);
        formAgregar.reset();
        formAgregar.style.display = "none";
        mostrarPersonas();
    });

    // ===================== FORMULARIO BUSCAR =====================

    // Evento submit del formulario "Buscar"
    const formBuscar = document.querySelector('#form-buscar');
    formBuscar.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombre = formBuscar.nombre.value || '';
        const dni = formBuscar.dni.value || '';
        const resultados = buscarPersonas(nombre, dni);
        mostrarPersonas(resultados);
    });

    // Boton limpiar filtros de busqueda
    const btnLimpiar = document.querySelector('#btn-filtros');
    btnLimpiar.addEventListener('click', (event) => {
        event.preventDefault();
        formBuscar.reset();
        mostrarPersonas();
    });

    // ===================== LISTADO: ELIMINAR Y MODIFICAR =====================

    // Delegacion de eventos en el listado para los botones Eliminar y Modificar
    const listadoPersonas = document.querySelector('#listadoPersonas');
    if (listadoPersonas) {
        listadoPersonas.addEventListener('click', (event) => {

            // Boton Eliminar
            if (event.target.matches('.btn-eliminar')) {
                const dni = event.target.dataset.dni;
                if (!dni) return;
                eliminarPersona(dni);
                mostrarPersonas();
            }

            // Boton Modificar: carga los datos en el formulario
            if (event.target.matches('.btn-modificar')) {
                const dni = event.target.dataset.dni;
                if (!dni) return;
                cargarFormModificar(dni);
            }
        });
    }

    // ===================== FORMULARIO MODIFICAR =====================

    // Ocultar formulario "Modificar persona" desde el boton cerrar (X)
    const btnCerrarFormModif = document.querySelector(".btn-cerrar-formModif");
    btnCerrarFormModif.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#form-modificar").style.display = "none";
    });

    // Evento submit del formulario "Modificar Persona"
    const formModificar = document.querySelector("#form-modificar");
    formModificar.addEventListener("submit", (event) => {
        event.preventDefault();
        const datosModificados = {
            nombre: formModificar.nombre.value,
            edad: formModificar.edad.value,
            dni: formModificar.dni.value
        };
        modificarPersona(datosModificados);
        formModificar.reset();
        formModificar.style.display = "none";
        mostrarPersonas();
    });

});
