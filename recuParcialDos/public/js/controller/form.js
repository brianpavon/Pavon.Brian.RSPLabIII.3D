import Anuncio_Auto from "../anuncio.js";

export let divTabla = document.getElementById("divTabla");
export let frmAnuncioAutos = document.forms[0];


export function obtenerAnuncio()
{
    
    const nuevoAnuncio = new Anuncio_Auto("",
        
        frmAnuncioAutos.titulo.value,        
        frmAnuncioAutos.transaccion.value,       
        frmAnuncioAutos.descripcion.value,
        parseInt(frmAnuncioAutos.precio.value),
        parseInt(frmAnuncioAutos.puertas.value),
        parseInt(frmAnuncioAutos.kms.value),
        parseInt(frmAnuncioAutos.potencia.value)
        );
    
    return nuevoAnuncio;
}

export function limpiarCampos()
{

    let txtTitulo = document.getElementById('txtTitulo');
    let txtDescripcion = document.getElementById('txtDescripcion');
    let txtPrecio = document.getElementById('txtPrecio');
    let txtPuertas = document.getElementById('txtPuertas');
    let txtKms = document.getElementById('txtKms');
    let txtPotencia = document.getElementById('txtPotencia');
    let btnModificar = document.getElementById("btnModificar");
    let btnCancelar = document.getElementById("btnCancelar");
    let btnEliminar = document.getElementById("btnEliminar");
    btnModificar.style.display = "none";
    btnCancelar.style.display = "none";
    btnEliminar.style.display = "none";
    txtTitulo.value = '';
    txtDescripcion.value = '';
    txtPrecio.value = '';
    txtPuertas.value = '';
    txtKms.value = '';
    txtPotencia.value = '';
}