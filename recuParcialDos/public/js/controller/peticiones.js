import Anuncio_Auto from "../anuncio.js";
import {obtenerAnuncio,divTabla,limpiarCampos,frmAnuncioAutos} from "./form.js";
import crearTabla from "../tabla.js";



export function traerAnuncios()
{
    
    return new Promise ((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        spinner.appendChild(crearSpineer());
        xhr.addEventListener('readystatechange',()=>{
        
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    const datosParseados = [];
                    let datos = JSON.parse(xhr.responseText);
                    datos.forEach(element => {
                        const anuncio = new Anuncio_Auto(
                            element.id,
                            element.titulo,
                            element.transaccion,
                            element.descripcion,
                            element.precio,
                            element.num_puertas,
                            element.num_kms,                            
                            element.potencia
                            )  
                        datosParseados.push(anuncio);                 
                    }); 
                    //console.log(datos);
                    //console.log(datosParseados);
                    
                    resolve(datosParseados);           
                }
                else
                {
                    let msjError = xhr.statusText || "Ocurrio un error";
                    reject({status:xhr.status, statusText: msjError});
                    console.log("Error: "+xhr.status + "-" + xhr.statusText);
                }
                //console.log(datosParseados);
                //return datosParseados;
                spinner.innerHTML = ""; 
            }
        });
        xhr.open('GET','http://localhost:3000/anuncios_autos');
        xhr.send();
    })
}


export function altaNuevoAnuncio()
{
    return new Promise ((resolve,reject)=>{
        const nuevoAnuncio = obtenerAnuncio();
        const xhr = new XMLHttpRequest();
    
        spinner.appendChild(crearSpineer());
        xhr.addEventListener('readystatechange',()=>{
            if(xhr.readyState == 4)
            {
                if(xhr.status >= 200 && xhr.status < 300)
                {
                    let datos = JSON.parse(xhr.responseText);
                    console.log(datos);
                    resolve(true);
                }
                else
                {
                    let msjError = xhr.statusText || "Ocurrio un error";
                    reject({status:xhr.status, statusText: msjError});
                    console.log("Error: "+xhr.status + "-" + xhr.statusText);
                }
                spinner.innerHTML = "";
                limpiarCampos(); 
            }   
         });
        xhr.open('POST',"http://localhost:3000/anuncios_autos");
        xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
        xhr.send(JSON.stringify(nuevoAnuncio));
    })
    
}


function crearSpineer()
{
    const img = document.createElement('img');
    img.setAttribute("src", "./images/ruedaSpinner.gif");
    img.setAttribute("alt","Imagen Spineer");

    return img;
}

function vaciarCampos(elemento)
{
    while(elemento.firstChild)
    {
        elemento.removeChild(elemento.firstChild);
    }
}

export function actualizarLista(lista)
{
   
    
        setTimeout(() => {
            while (divTabla.firstChild) {
                divTabla.removeChild(divTabla.lastChild);
              }
              divTabla.appendChild(crearTabla(lista));
        }, 2000);
    

}

export function modificarAnuncio()
{
    const nuevoAnuncio = obtenerAnuncio();
    const xhr = new XMLHttpRequest();
    let idSeleccionado = frmAnuncioAutos.id.value;
    //spinner.appendChild(crearSpineer());
    xhr.addEventListener('readystatechange',()=>{
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                let datos = JSON.parse(xhr.responseText);
                console.log(datos);
            }
            else
            {
                console.log("Error: "+xhr.status + "-" + xhr.statusText);
            }
            //spinner.innerHTML = ""; 
        }
    });
    xhr.open('PUT',"http://localhost:3000/anuncios_autos/"+idSeleccionado);
    xhr.setRequestHeader("Content-type","application/json;charset=utf-8");
    xhr.send(JSON.stringify(nuevoAnuncio));   
    
}

export function borrarAnuncio()
{
    divTabla.innerHTML = "";
    spinner.appendChild(crearSpineer());
    let idSeleccionado = frmAnuncioAutos.id.value;
    const config = {
        method : "DELETE",
        headers : {
            "Content-type" : "application/json;charset=utf-8"
        },
        
    }
    fetch('http://localhost:3000/anuncios_autos/'+ idSeleccionado,config)
    .then(res=>{
        if(!res.ok) return Promise.reject(res);
        return res.json();
    })
    .then(anuncio_auto=>{
        console.log("Baja exitosa",anuncio_auto);        
        cargarAnuncios();
    })
    .catch(err=>{
        console.error(err.status);
    })
    .finally(()=>{
        spinner.innerHTML = "";
    });
}

//PARA CARGAR AUTOMATICAMENTE LA TABLA
export function cargarAnuncios()
{
    const xhr = new XMLHttpRequest();
    
    divTabla.innerHTML = "";
    spinner.appendChild(crearSpineer());

    xhr.addEventListener('readystatechange',()=>{
        
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                
                let datos = JSON.parse(xhr.responseText);
                

                divTabla.appendChild(crearTabla(datos));
            }
            else
            {
                
                console.log("Error: "+xhr.status + "-" + xhr.statusText);
            }
            
            spinner.innerHTML = ""; 
        }
    });
    xhr.open('GET','http://localhost:3000/anuncios_autos');
    xhr.send();
}