// Este archivo contiene todas las funciones del CRUD (Create, Read, Update, Delete)
// Los datos se almacenan en localStorage bajo la clave "personas"

// ===================== CREATE =====================

// Agrega una nueva persona al localStorage
const agregarPersona = (nuevaPersona) => {
    let personas = JSON.parse(localStorage.getItem("personas")) || [];

    // Verificar que no exista otra persona con el mismo DNI
    const existe = personas.some(p => p.dni === nuevaPersona.dni);
    if (existe) {
        mostrarMensaje("Ya existe una persona con ese DNI");
        return false;
    }

    personas.push(nuevaPersona);
    localStorage.setItem("personas", JSON.stringify(personas));
    mostrarMensaje("Persona agregada correctamente");
    return true;
}

// ===================== READ =====================

// Muestra el listado de personas en el DOM
// Si recibe un array por parametro lo usa, sino lee todo el localStorage
const mostrarPersonas = (personasParam = null) => {
    const cont = document.querySelector('#listadoPersonas');
    if (!cont) return;
    cont.innerHTML = "";

    const personas = personasParam || JSON.parse(localStorage.getItem("personas")) || [];

    if (personas.length === 0) {
        cont.innerHTML = "<p>No hay personas registradas</p>";
        return;
    }

    personas.forEach(p => {
        cont.innerHTML += `
            <div class="persona">
                <div class="info">
                    <p>Nombre: ${p.nombre}</p>
                    <p>Edad: ${p.edad}</p>
                    <p>Dni: ${p.dni}</p>
                </div>
                <div class="botones">
                    <button class="btn-modificar" data-dni="${p.dni}">Modificar</button>
                    <button class="btn-eliminar" data-dni="${p.dni}">Eliminar</button>
                </div>
            </div>
        `;
    });
}

// Busca personas filtrando por nombre y/o dni
const buscarPersonas = (nombre, dni) => {
    const lista = JSON.parse(localStorage.getItem("personas")) || [];
    const nombreFiltro = nombre.trim().toLowerCase();
    const dniFiltro = dni.trim();

    return lista.filter(p => {
        const matchNombre = !nombreFiltro || p.nombre.toLowerCase().includes(nombreFiltro);
        const matchDni = !dniFiltro || p.dni.includes(dniFiltro);
        return matchNombre && matchDni;
    });
}

// ===================== UPDATE =====================

// Carga los datos de una persona en el formulario de modificar y lo muestra
const cargarFormModificar = (dni) => {
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    const persona = personas.find(p => p.dni === dni);
    if (!persona) {
        mostrarMensaje("No se encontró la persona");
        return;
    }

    const formModificar = document.querySelector("#form-modificar");
    formModificar.querySelector("h3").textContent = `Modificar datos persona DNI ${persona.dni}`;
    formModificar.dni.value = persona.dni;
    formModificar.nombre.value = persona.nombre;
    formModificar.edad.value = persona.edad;
    formModificar.style.display = "block";
}

// Modifica los datos de una persona en el localStorage buscando por DNI
const modificarPersona = (datosModificados) => {
    let personas = JSON.parse(localStorage.getItem("personas")) || [];
    const indice = personas.findIndex(p => p.dni === datosModificados.dni);

    if (indice === -1) {
        mostrarMensaje("No se encontró la persona a modificar");
        return false;
    }

    personas[indice].nombre = datosModificados.nombre;
    personas[indice].edad = datosModificados.edad;
    localStorage.setItem("personas", JSON.stringify(personas));
    mostrarMensaje("Persona modificada correctamente");
    return true;
}

// ===================== DELETE =====================

// Elimina una persona del localStorage segun su DNI
const eliminarPersona = (dni) => {
    let personas = JSON.parse(localStorage.getItem("personas")) || [];
    const nuevasPersonas = personas.filter(p => p.dni !== dni);
    localStorage.setItem("personas", JSON.stringify(nuevasPersonas));
    mostrarMensaje("Persona eliminada correctamente");
}
