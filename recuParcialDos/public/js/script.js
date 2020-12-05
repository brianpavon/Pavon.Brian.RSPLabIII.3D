import crearTabla from "./tabla.js";

import Anuncio_Auto from "./anuncio.js";
import {frmAnuncioAutos,divTabla,limpiarCampos, obtenerAnuncio} from "./controller/form.js";
import {traerAnuncios,altaNuevoAnuncio,cargarAnuncios,borrarAnuncio,modificarAnuncio} from "./controller/peticiones.js";

const inputPromedio = document.getElementById('inputPromedio');
const filtro = document.getElementById('filtroTransaccion');
const inputMayor = document.getElementById('inputMayor');
const inputMinimo = document.getElementById('inputMinimo');
const inputPromPotencia = document.getElementById('promPotencia');

//let frmAnuncioAutos;

//let divTabla;
//let divTabla = document.getElementById("divTabla");
let listaAnuncios;
let checks;
window.addEventListener('load',inicializarManejadores);

async function inicializarManejadores()
{
    
    
    listaAnuncios = await traerAnuncios();
    console.log(listaAnuncios);
    divTabla.appendChild(crearTabla(listaAnuncios));
    
    
    frmAnuncioAutos.addEventListener('submit',async (e)=>{
        e.preventDefault();
        
        altaNuevoAnuncio();
        //lista = await traerAnuncios();
        //actualizarLista(lista);
        cargarAnuncios();
    });
    inputPromPotencia.value = promedioPotencia(listaAnuncios);
    botonesModificacion();
    checks = document.querySelectorAll( '.cbox' );
    checks.forEach( element  =>  { filtrarColumnas( element, listaAnuncios ); });
}

function botonesModificacion()
{
    
    let btnModificar = document.getElementById("btnModificar");
    let btnCancelar = document.getElementById("btnCancelar");
    let btnEliminar = document.getElementById("btnEliminar");
    
     
    btnModificar.addEventListener('click',e=>{
        modificarAnuncio();
        limpiarCampos()
        //cargarAnuncios();
    });
    
    btnCancelar.addEventListener('click',e=>{
        limpiarCampos();
        
    });
    btnEliminar.addEventListener('click',e=>{
        borrarAnuncio();
        limpiarCampos();
        
    });
    
}


//const filtroAlquiler = document.getElementById('selectVenta')
filtro.addEventListener('change',e=>{
    
    e.preventDefault();
    
   
    console.log(filtro.value);
    let mayor = buscarMayor(filtro.value,listaAnuncios);
    let promedio = filtrar(filtro.value,listaAnuncios);
    let menor = buscarMenor(filtro.value,listaAnuncios);
    console.log(mayor)
    console.log(promedio);
    inputMayor.value = mayor;
    inputPromedio.value=promedio;
    inputMinimo.value = menor;
    
})



function filtrar(filtro,lista)
{
    let promedio = "N/A";
    if(filtro == "Alquiler")
    {
        const precioAlquiler = lista.filter(anun=>anun.transaccion === 'Alquiler');
        const precios = precioAlquiler.map(element => element.precio);
        const cantPrecios = precios.length;
        const total = precios.reduce((prev,actual)=>prev + actual,0);

        promedio = total / cantPrecios;
    }
    else if(filtro == "Venta")
    {
        const precioAlquiler = lista.filter(anun=>anun.transaccion === 'Venta');
        const precios = precioAlquiler.map(element => element.precio);
        const cantPrecios = precios.length;
        const total = precios.reduce((prev,actual)=>prev + actual,0);
        promedio = total / cantPrecios;
    }
    
   
    return promedio;
}

function buscarMayor(filtro,listaAnuncios)
{
    let mayor = 0;
    if(filtro != '#')
    {
        const precioAlquiler = listaAnuncios.filter(anun=>anun.transaccion === filtro);
        const precios = precioAlquiler.map(element => element.precio);

        let mayor = precios.reduce((prev,actual)=>{
        return prev > actual ? prev : actual;
        });
        return mayor;

    }
    
        return mayor;
    
    
}

function buscarMenor(filtro,listaAnuncios)
{
    let menor = 0;
    if(filtro != '#')
    {
        const precioAlquiler = listaAnuncios.filter(anun=>anun.transaccion === filtro);
        const precios = precioAlquiler.map(element => element.precio);

        let menor = precios.reduce((prev,actual)=>{
            return prev < actual ? prev : actual;
        });
        return menor;
    }
    else
    {
        return menor;
    }
}

function promedioPotencia(listaAnuncios)
{
    let promedio = 0;
    //const precioAlquiler = listaAnuncios.filter(anun=>anun.transaccion === 'Venta');
    const potencia = listaAnuncios.map(element => element.potencia);
    //console.log(potencia);
    const cantDeAnuncios = potencia.length;
    //console.log(cantDeAnuncios);
    const total = potencia.reduce((prev,actual)=>prev + actual,0);
    //console.log(total);
    return promedio = total / cantDeAnuncios;

}






async function filtrarColumnas( check, listaAnuncios ) {
    
   
    check.addEventListener( 'click', async() => { 
        let listaMapeada = listaAnuncios.map( row => { 
            
            let fila = {};
            for (const key in row) {
                //console.log(key);
                //console.log(row);
                if ( document.getElementById('chk'+key).checked ) {
                    //console.log('chk'+key);
                    fila[key] = row[key];
                }

            }
            return fila;
        })

        //console.log(listaMapeada);
        //actualizarLista(listaMapeada);
        //cargarAnuncios();
        divTabla.innerHTML = "";
        listaAnuncios = await traerAnuncios();
        //console.log(listaAnuncios);
        divTabla.appendChild(crearTabla(listaAnuncios));

    });
};