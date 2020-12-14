// Variables.

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito =[];


cargarEventListeners();

// funcion donderegistro y creo todos los listeners 
function cargarEventListeners(){
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    // Listener para eliminar cursos del carrito.
    carrito.addEventListener('click',eliminarCurso);

    // Vaciar el Carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        // Reseteamos el array
        articulosCarrito = [];
        // Volvemos a refrescar el HTML pero como lo dejamos vacio no es necesario
        // llamar a carrito HTML para que ejecute limpiarHTML. Es mas rapido 
        // pasar directamente la funcion de limpiar
        limpiarHTML();
        
    });
}



// Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
       
    } 
}

// Elimina un curso del carrito
function eliminarCurso(e){
    
    if(e.target.classList.contains('borrar-curso')){
        // console.log(e.target.classList);
        //console.log(e.target.getAttribute('data-id'));
        const cursoIdEliminar = e.target.getAttribute('data-id');
        console.log ("curso a eliminar", cursoIdEliminar);
        // elimina del array articuloscarrito por el data-id.del curso.
        articulosCarrito = articulosCarrito.filter(curso => curso.idCurso !== cursoIdEliminar );
        // Para que se actualice el HTML del carrito volvemos a iterar sobre el carrito
        carritoHTML();

    }
}


// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
   //console.log(curso);
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,   //curso.querySelector('.precio').textContent (esto seria todo el texto del elemento p)
        idCurso: curso.querySelector('a').getAttribute('data-id'),  
        cantidad: 1
    }
    // Revisa si un elemento existe en el carrito. A traves del metodo some para ver si esta en el array articulos carrito
    const existe = articulosCarrito.some(curso => curso.idCurso === infoCurso.idCurso); 
   if (existe){
       // actualizamos la cantidad
       const cursos = articulosCarrito.map(curso =>{
           if( curso.idCurso === infoCurso.idCurso){
                curso.cantidad++;
                return curso; // Devuelve el objeto actualizdado
           }else{
               return curso; // Devuelve el (los) objeto(s) que no son duplicados.
           }
       });
       articulosCarrito = [...cursos];

   }else{
       // Agregamos el curso al carrito
        // Agrega elementos al array del carrito de compras. Copia el array con Spread Operator y le añado la informacion del curso (infocurso) {Objeto}
        articulosCarrito = [...articulosCarrito, infoCurso];
   }

   // console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();
    
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso =>{
        // Uso destructuring para mejorar el código.
        const {imagen, titulo, precio, idCurso, cantidad } = curso;
        
        // como vamos a insertar cada curso, tendremos que insertar una fila en el elemento HTML del carrito
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${idCurso}">X </a>
            </td>

        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML(){
    // forma rapida
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
       
    }
    // Forma lenta
    //contenedorCarrito.innerHTML='';
}

