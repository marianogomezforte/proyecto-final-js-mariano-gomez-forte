let grados; // Variable para almacenar los datos del archivo JSON

async function cargarDatos() {
    try {
    const response = await fetch("./json/grados.json");
    grados = await response.json();

    console.log(grados);
    localStorage.setItem("grados", JSON.stringify(grados));
    } catch (error) {
    console.error("Error al cargar los datos del archivo JSON:", error);
    }
}
cargarDatos();


function guardarCambios(grados) {
    
    fetch('guardar.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(grados)
    })
    .then(response => {
        if (response.ok) {
        console.log('Cambios guardados exitosamente');
        } else {
        console.log('Error al guardar los cambios');
        }
    });
}



/* Grupo de botones menu */
const btnGrados = document.getElementById("btnGrados");
const btnMetEval = document.getElementById("btnMetEval");
const btnRegNotas = document.getElementById("btnRegNotas");
const btnVisuNotas = document.getElementById("btnVisuNotas");

/* Contenedores a mostrar/ocultar */
const contGrados = document.getElementById("contGrados");
const contDetGrados = document.getElementById("contDetGrados");
const contMetodoEval = document.getElementById("contMetodoEval");
const contRegistro = document.getElementById("contRegistro");
const contVisualizar = document.getElementById("contVisualizar");
const tablaDet1 = document.getElementById("tablaDet1");
const tablaDet2 = document.getElementById("tablaDet2");
const contDet1 = document.getElementById("contDet1");
const contDet2 = document.getElementById("contDet2");
const contListaAlum = document.getElementById("contListaAlum");
const contLIstaAlumVisu = document.getElementById("contLIstaAlumVisu");

/* Otros Botones */
const btnNuevoMetEval = document.getElementById("btnNuevoMetEval");
const btnBusc = document.getElementById("btnBusc");
const btnGuardarNotas = document.getElementById("btnGuardarNotas");
const btnCancelarNotas = document.getElementById("btnCancelarNotas");
const btnBuscVisNotas = document.getElementById("btnBuscVisNotas");

/* Selectores */
const selectorGrado = document.getElementById("selectorGrado");
const selectorMateria = document.getElementById("selectorMateria");
const selectorGradoVisu = document.getElementById("selectorGradoVisu");
const selectorMateriaVisu = document.getElementById("selectorMateriaVisu");

btnGrados.onclick = () => {
  contGrados.classList.remove("d-none");
  contDetGrados.classList.add("d-none");
  contMetodoEval.classList.add("d-none");
  contRegistro.classList.add("d-none");
  contVisualizar.classList.add("d-none");
  tablaDet1.classList.add("d-none");
  tablaDet2.classList.add("d-none");
};

btnMetEval.onclick = () => {
    contGrados.classList.add("d-none");
    contDetGrados.classList.add("d-none");
    contMetodoEval.classList.remove("d-none");
    contRegistro.classList.add("d-none");
    contVisualizar.classList.add("d-none");
    llenarTablaMetEval();
    tablaCriterio.innerHTML = "";
};

btnRegNotas.onclick = () => {
    contGrados.classList.add("d-none");
    contDetGrados.classList.add("d-none");
    contMetodoEval.classList.add("d-none");
    contRegistro.classList.remove("d-none");
    contVisualizar.classList.add("d-none");
    contListaAlum.classList.add("d-none");
    popularOpcionGrado();
    generarOpcionesMaterias();
};

btnVisuNotas.onclick = () => {
    contGrados.classList.add("d-none");
    contDetGrados.classList.add("d-none");
    contMetodoEval.classList.add("d-none");
    contRegistro.classList.add("d-none");
    contVisualizar.classList.remove("d-none");
    popularOpcionGradoVisu();
    generarOpcionesMateriasVisu();
};

contDet1.onclick = () => {
    contDetGrados.classList.remove("d-none");
    if (tablaDet1.classList.contains("d-none")) {
        tablaDet1.classList.remove("d-none");
    } else {
        tablaDet1.classList.add("d-none");
    }
};

contDet2.onclick = () => {
    contDetGrados.classList.remove("d-none");
    if (tablaDet2.classList.contains("d-none")) {
        tablaDet2.classList.remove("d-none");
    } else {
        tablaDet2.classList.add("d-none");
    }
};

/* Popular opciones en Registro de Notas */
function popularOpcionGrado() {
    selectorGrado.innerHTML =
        '<option value="">--- Seleccionar Opción ---</option>';
    grados.forEach((grado, indice) => {
        const option = document.createElement("option");
        option.textContent = grado.nombre;
        option.value = indice.toString();
        selectorGrado.appendChild(option);
    });
}
function generarOpcionesMaterias() {
    const indiceGrado = parseInt(selectorGrado.value);
    const gradoSeleccionado = grados[indiceGrado];

    selectorMateria.innerHTML =
        '<option value="">--- Seleccionar Opción ---</option>';

    if (gradoSeleccionado) {
        gradoSeleccionado.materia.forEach((materia, indice) => {
        const opcion = document.createElement("option");
        opcion.value = indice.toString();
        opcion.textContent = materia.nombre;
        selectorMateria.appendChild(opcion);
        });
    }
}
selectorGrado.addEventListener("change", generarOpcionesMaterias);

function llenarTablaMetEval() {
    const tablaMetEval = document.getElementById("tablaMetEval");
    tablaMetEval.innerHTML = "";

    grados.forEach((grado) => {
        grado.materia.forEach((materia, indiceMateria) => {
        const fila = document.createElement("tr");

        const numeroTd = document.createElement("td");
        numeroTd.textContent = indiceMateria + 1;

        const gradoTd = document.createElement("td");
        gradoTd.textContent = grado.nombre;

        const materiaTd = document.createElement("td");
        materiaTd.textContent = materia.nombre;

        const accionTd = document.createElement("td");
        const boton = document.createElement("button");
        boton.classList.add("btn");
        boton.classList.add("btn-success");
        boton.classList.add("rounded");
        boton.textContent = "Ver";

        boton.addEventListener("click", () => {
            console.log(materia.metodoEval);
            mostrarTablaCriterios(materia.metodoEval);
        });

        accionTd.appendChild(boton);

        fila.appendChild(numeroTd);
        fila.appendChild(gradoTd);
        fila.appendChild(materiaTd);
        fila.appendChild(accionTd);

        tablaMetEval.appendChild(fila);
        });
    });
}

function mostrarTablaCriterios(metodoEval) {
    const tablaCriterio = document.getElementById("tablaCriterio");
    tablaCriterio.innerHTML = "";

    metodoEval.forEach((metodo) => {
        const fila = document.createElement("tr");

        const criterioTd = document.createElement("td");
        criterioTd.textContent = metodo[0];

        const porcentajeTd = document.createElement("td");
        porcentajeTd.textContent = metodo[1] + "%";

        fila.appendChild(criterioTd);
        fila.appendChild(porcentajeTd);
        tablaCriterio.appendChild(fila);
    });
}

btnBusc.onclick = () => {
    contListaAlum.classList.remove("d-none");
    mostrarTablaAlumnosRegNotas();
};

function mostrarTablaAlumnosRegNotas() {
  // obtengo los valores seleccionados del select del grado y la materia
    let iGrado = selectorGrado.value;
    let iMateria = selectorMateria.value;

    const tablaRegistroNotas = document.getElementById('tablaRegistroNotas');
    const tabla = document.createElement('thead');
    tablaRegistroNotas.innerHTML = '';

    const encabezadoFila = document.createElement('tr');
    encabezadoFila.classList.add('text-center');

    const encabezadoAlumno = document.createElement('th');
    encabezadoAlumno.textContent = 'ALUMNO';
    encabezadoAlumno.classList.add('col-sm-3');
    encabezadoFila.appendChild(encabezadoAlumno);

    grados[iGrado].materia[iMateria].metodoEval.forEach((met) => {
        let encabEval = document.createElement('th');
        encabEval.textContent = `${met[0]} (${met[1]} %)`;
        encabEval.classList.add('col-sm-2');
        encabezadoFila.appendChild(encabEval);
    });

    const encabezadoPonderacion = document.createElement('th');
    encabezadoPonderacion.textContent = 'PONDERADO'
    encabezadoPonderacion.classList.add('col-sm-2');
    encabezadoFila.appendChild(encabezadoPonderacion);

    tabla.appendChild(encabezadoFila);
    tablaRegistroNotas.appendChild(tabla);

    const tbody = document.createElement('tbody');

    grados[iGrado].materia[iMateria].alumnos.forEach((alum) =>{
        const fila = document.createElement('tr');
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = `${alum.apellido}, ${alum.nombre}`;
        fila.appendChild(celdaNombre);

        const notasInput = []; // Array para almacenar los elementos input de notas
        const ponderacionEval = grados[iGrado].materia[iMateria].metodoEval.map((met) => met[1]); // Array de ponderaciones


        grados[iGrado].materia[iMateria].metodoEval.forEach((met,indice) =>{
            const celdaNota = document.createElement('td');
            const inputNota = document.createElement('input');
            inputNota.type = 'number';
            inputNota.min = 0;
            inputNota.max = 10;
            inputNota.value = alum.notas[indice];
            inputNota.classList.add('form-control');
            inputNota.classList.add('text-center');
            inputNota.classList.add('inputNota');
/*             inputNota.addEventListener('change', calcularPonderado);*/            celdaNota.appendChild(inputNota);
            fila.appendChild(celdaNota);

            notasInput.push(inputNota); // Agregar input de nota al array
        });

        const celdaPonderado = document.createElement('td');
        const inputPonderado = document.createElement('input');
        inputPonderado.type = 'number';
        inputPonderado.value = alum.ponderacion;
        inputPonderado.disabled = true;
        inputPonderado.classList.add('form-control');
        inputPonderado.classList.add('text-center');
        inputPonderado.classList.add('inputPonderado');

        celdaPonderado.appendChild(inputPonderado);
        fila.appendChild(celdaPonderado);

        tbody.appendChild(fila);

        // Evento al ingresar nota
        notasInput.forEach((input) => {
            input.addEventListener('input', () => {
                const nota = parseFloat(input.value);
            
                if (isNaN(nota) || nota < 0 || nota > 10) {
                    input.value = ''; 
                    Swal.fire({
                        icon: 'error',
                        title: 'Nota Inválida',
                        text: 'Por favor ingrese una nota válida (entre 0 y 10)',
                    });
                    } else {
                    const notas = Array.from(notasInput).map((input) => parseFloat(input.value));
                    const ponderacionEval = grados[iGrado].materia[iMateria].metodoEval.map((met) => met[1]);
                    const ponderado = calcularPonderado(notas, ponderacionEval);
                    const celdaPonderado = input.parentNode.nextElementSibling.querySelector('input');
                    celdaPonderado.value = ponderado.toFixed(2);
                }
            });
        });
        
            
    });
    tablaRegistroNotas.appendChild(tbody);
}

// Función para calcular el ponderado
function calcularPonderado(notas, ponderacionEval) {
    let ponderado = 0;
    for (let i = 0; i < notas.length; i++) {
      ponderado += (notas[i] * ponderacionEval[i]) / 100;
    }
    return ponderado;
}

btnGuardarNotas.addEventListener('click', guardarNotas);

function guardarNotas(){
    // Obtén los índices del grado y la materia seleccionados
    const iGrado = selectorGrado.value;
    const iMateria = selectorMateria.value;
    const inputsNotas = document.getElementsByClassName('inputNota')
    const inputsPonderado = document.getElementsByClassName('inputPonderado')

    console.log(iGrado);
    console.log(iMateria);
    for (let i = 0; i < inputsNotas.length; i++){
        console.log(inputsNotas[i].value);
    }
    console.log('ahora las ponderaciones');
    for (let i = 0; i < inputsPonderado.length; i++){
        console.log(inputsPonderado[i].value);
    }

    /* grados[iGrado].materia[iMateria].alumnos.forEach((alum, indice) => {
        for (let i=0; i<3; i++){
            alum.notas.push(inputsNotas[i]);
            inputsNotas.splice(0,3);
            console.log(inputsNotas);
        }
        alum.ponderacion = inputsPonderado[indice];
        inputsPonderado.splice(0,1);
        console.log(inputsPonderado);
    });

    guardarCambios(grados); */
}


/* Popular opciones en Visualizacion de Notas */
function popularOpcionGradoVisu() {
    selectorGradoVisu.innerHTML =
        '<option value="">--- Seleccionar Opción ---</option>';
    grados.forEach((grado, indice) => {
        const option = document.createElement("option");
        option.textContent = grado.nombre;
        option.value = indice.toString();
        selectorGradoVisu.appendChild(option);
    });
}
function generarOpcionesMateriasVisu() {
    const indiceGrado = parseInt(selectorGradoVisu.value);
    const gradoSeleccionado = grados[indiceGrado];

    selectorMateriaVisu.innerHTML =
        '<option value="">--- Seleccionar Opción ---</option>';

    if (gradoSeleccionado) {
        gradoSeleccionado.materia.forEach((materia, indice) => {
        const opcion = document.createElement("option");
        opcion.value = indice.toString();
        opcion.textContent = materia.nombre;
        selectorMateriaVisu.appendChild(opcion);
        });
    }
}
selectorGradoVisu.addEventListener("change", generarOpcionesMateriasVisu);


btnBuscVisNotas.onclick = () => {
    contLIstaAlumVisu.classList.remove("d-none");
    mostrarTablaAlumnosVisuNotas();
};

function mostrarTablaAlumnosVisuNotas(){
    // obtengo los valores seleccionados del select del grado y la materia
    let iGrado = selectorGradoVisu.value;
    let iMateria = selectorMateriaVisu.value;

    const tablaVisualNotas = document.getElementById('tablaVisualNotas');
    const tabla = document.createElement('thead');
    tablaVisualNotas.innerHTML = '';

    const encabezadoFila = document.createElement('tr');
    encabezadoFila.classList.add('text-center');

    const encabezadoAlumno = document.createElement('th');
    encabezadoAlumno.textContent = 'ALUMNO';
    encabezadoAlumno.classList.add('col-sm-3');
    encabezadoFila.appendChild(encabezadoAlumno);

    grados[iGrado].materia[iMateria].metodoEval.forEach((met) => {
        let encabEval = document.createElement('th');
        encabEval.textContent = `${met[0]} (${met[1]} %)`;
        encabEval.classList.add('col-sm-2');
        encabezadoFila.appendChild(encabEval);
    });

    const encabezadoPonderacion = document.createElement('th');
    encabezadoPonderacion.textContent = 'PONDERADO'
    encabezadoPonderacion.classList.add('col-sm-2');
    encabezadoFila.appendChild(encabezadoPonderacion);

    tabla.appendChild(encabezadoFila);
    tablaVisualNotas.appendChild(tabla);

    const tbody = document.createElement('tbody');

    grados[iGrado].materia[iMateria].alumnos.forEach((alum) =>{
        const fila = document.createElement('tr');
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = `${alum.apellido}, ${alum.nombre}`;
        fila.appendChild(celdaNombre);

        grados[iGrado].materia[iMateria].metodoEval.forEach((met,indice) =>{
            const celdaNota = document.createElement('td');
            const inputNota = document.createElement('input');
            inputNota.type = 'number';
            inputNota.value = alum.notas[indice];
            inputNota.disabled = true;
            inputNota.classList.add('form-control');
            inputNota.classList.add('text-center');
            inputNota.classList.add('inputNota');
            
            celdaNota.appendChild(inputNota);
            fila.appendChild(celdaNota);

        });

        const celdaPonderado = document.createElement('td');
        const inputPonderado = document.createElement('input');
        inputPonderado.type = 'number';
        inputPonderado.value = alum.ponderacion;
        inputPonderado.disabled = true;
        inputPonderado.classList.add('form-control');
        inputPonderado.classList.add('text-center');
        inputPonderado.classList.add('inputPonderado');

        celdaPonderado.appendChild(inputPonderado);
        fila.appendChild(celdaPonderado);

        tbody.appendChild(fila);
    });
    tablaVisualNotas.appendChild(tbody);
}
