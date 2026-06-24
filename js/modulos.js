function agregarPersona(nuevaPersona) {
    let personas = JSON.parse(localStorage.getItem("personas")) || [];
    personas.push(nuevaPersona);
    localStorage.setItem("personas", JSON.stringify(personas));
}

function mostrarPersonas(personas = null) {
    const cont = document.querySelector("#listadoPersonas");
    cont.innerHTML = "";

    personas = personas || JSON.parse(localStorage.getItem("personas")) || [];

    personas.forEach(p => {
        cont.innerHTML += `
            <div class="persona">
                <div class="info">
                    <p>Nombre: ${p.nombre}</p>
                    <p>Edad: ${p.edad}</p>
                    <p>Dni: ${p.dni}</p>
                </div>
                <div class="botones">
                    <button onclick="cargarFormModificar('${p.dni}')">Modificar</button>
                    <button onclick="eliminarPersona('${p.dni}')">Eliminar</button>
                </div>
            </div>
        `;
    });
}

function buscarPersonas(nombre, dni) {
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    return personas.filter(p =>
        p.nombre.toLowerCase().includes(nombre.toLowerCase()) && p.dni.includes(dni)
    );
}

function cargarFormModificar(dni) {
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    const persona = personas.find(p => p.dni === dni);

    const form = document.querySelector("#form-modificar");
    form.querySelector("h3").textContent = `Modificar datos persona DNI ${persona.dni}`;
    form.dni.value = persona.dni;
    form.nombre.value = persona.nombre;
    form.edad.value = persona.edad;
    form.style.display = "block";
}

function modificarPersona(datos) {
    let personas = JSON.parse(localStorage.getItem("personas")) || [];
    const persona = personas.find(p => p.dni === datos.dni);
    persona.nombre = datos.nombre;
    persona.edad = datos.edad;
    localStorage.setItem("personas", JSON.stringify(personas));
}

function eliminarPersona(dni) {
    let personas = JSON.parse(localStorage.getItem("personas")) || [];
    personas = personas.filter(p => p.dni !== dni);
    localStorage.setItem("personas", JSON.stringify(personas));
    mostrarPersonas();
}
