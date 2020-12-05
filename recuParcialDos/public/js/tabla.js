
let frmAnuncioAutos;
export default function crearTabla(lista) {

    const tabla = document.createElement('table');
    tabla.appendChild(crearCabecera(lista[0]));
    tabla.appendChild(crearCuerpo(lista));

    return tabla;

}


function crearCabecera(item) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for (const key in item) {

        const th = document.createElement('th');
        const texto = document.createTextNode(key);
        th.appendChild(texto);

        tr.appendChild(th);
    }
    thead.appendChild(tr);
    return thead;
}

//devolver tbody
function crearCuerpo(lista) {
    const tbody = document.createElement('tbody');
    lista.forEach(element => {
        const tr = document.createElement('tr');
        for (const key in element) {

            const td = document.createElement('td');
            const texto = document.createTextNode(element[key]);
            td.appendChild(texto);
            tr.appendChild(td);
        }
        if (element.hasOwnProperty('id')) {
            tr.setAttribute('data-id', element['id']);
            tr.setAttribute('data-titulo', element['titulo']);
            tr.setAttribute('data-transaccion', element['transaccion']);
            tr.setAttribute('data-descripcion', element['descripcion']);
            tr.setAttribute('data-precio', element['precio']);
            tr.setAttribute('data-puertas', element['num_puertas']);
            tr.setAttribute('data-kms', element['num_kms']);
            tr.setAttribute('data-potencia', element['potencia']);
        }

        agregarManejadorTR(tr);
        tbody.appendChild(tr);
    });
    return tbody;
}

function agregarManejadorTR(tr) {
    if (tr) {
        tr.addEventListener('click', function (e) {

            frmAnuncioAutos = document.forms[0];
            cargarDatos(frmAnuncioAutos,e);
            
            
        });
        
    }
}

function cargarDatos(formulario,e) 
{
    limpiarCampos();
    let btnModificar = document.getElementById("btnModificar");
    let btnCancelar = document.getElementById("btnCancelar");
    let btnEliminar = document.getElementById("btnEliminar");
    btnModificar.style.display = "inline";
    btnCancelar.style.display = "inline";
    btnEliminar.style.display = "inline";
    formulario.id.value = e.target.parentNode.dataset.id;
    formulario.titulo.value = e.target.parentNode.dataset.titulo;
    formulario.transaccion.value = e.target.parentNode.dataset.transaccion;
    formulario.descripcion.value = e.target.parentNode.dataset.descripcion;
    formulario.precio.value = e.target.parentNode.dataset.precio;
    formulario.puertas.value = e.target.parentNode.dataset.puertas;
    formulario.kms.value = e.target.parentNode.dataset.kms;
    formulario.potencia.value = e.target.parentNode.dataset.potencia;
}

function limpiarCampos()
{
    let txtTitulo = document.getElementById('txtTitulo');
    let txtDescripcion = document.getElementById('txtDescripcion');
    let txtPrecio = document.getElementById('txtPrecio');
    let txtPuertas = document.getElementById('txtPuertas');
    let txtKms = document.getElementById('txtKms');
    let txtPotencia = document.getElementById('txtPotencia');
    txtTitulo.value = '';
    txtDescripcion.value = '';
    txtPrecio.value = '';
    txtPuertas.value = '';
    txtKms.value = '';
    txtPotencia.value = '';
}

