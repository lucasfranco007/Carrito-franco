// Variables
const baseDeDatos = [
  {
    id: 1,
    nombre: "Heineken",
    precio: 170,
    imagen: "../media/heine.png",
  },
  {
    id: 2,
    nombre: "Grolsh",
    precio: 150,
    imagen: "../media/grolshh.png",
  },
  {
    id: 3,
    nombre: "Corona",
    precio: 200,
    imagen: "../media/corona.png",
  },
  {
    id: 4,
    nombre: "Patagonia 24/7",
    precio: 250,
    imagen: "../media/patagonia.png",
  },
  {
    id: 5,
    nombre: "Gin Bombay",
    precio: 3000,
    imagen: "../media/bombay.png",
  },
  {
    id: 6,
    nombre: "Absolut",
    precio: 1000,
    imagen: "../media/vodka.png",
  },
];

let carrito = [];
let total = 0;
const DOMitems = document.querySelector("#items");
const DOMcarrito = document.querySelector("#carrito");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");
const miLocalStorage = window.localStorage;

// Funciones

function renderizarProductos() {
  baseDeDatos.forEach((info) => {
    // Estructura
    const miNodo = document.createElement("div");
    miNodo.classList.add("card", "col-sm-4");
    // Body
    const miNodoCardBody = document.createElement("div");
    miNodoCardBody.classList.add("card-body");
    // Titulo
    const miNodoTitle = document.createElement("h5");
    miNodoTitle.classList.add("card-title");
    miNodoTitle.textContent = info.nombre;
    // Imagen
    const miNodoImagen = document.createElement("img");
    miNodoImagen.classList.add("img-fluid");
    miNodoImagen.setAttribute("src", info.imagen);
    // Precio
    const miNodoPrecio = document.createElement("p");
    miNodoPrecio.classList.add("card-text");
    miNodoPrecio.textContent = "$" + info.precio;
    // Boton
    const miNodoBoton = document.createElement("button");
    miNodoBoton.classList.add("btn", "btn-primary");
    miNodoBoton.textContent = "Agregar";
    miNodoBoton.setAttribute("marcador", info.id);
    miNodoBoton.addEventListener("click", anyadirProductoAlCarrito);

    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
  });
}

/// añadir un producto al carrito de la compra

function anyadirProductoAlCarrito(evento) {
  carrito.push(evento.target.getAttribute("marcador"));
  calcularTotal();
  renderizarCarrito();
  guardarCarritoEnLocalStorage();
}

//// productos guardados en el carrito

function renderizarCarrito() {
  // Vaciamos todo el html
  DOMcarrito.textContent = "";
  const carritoSinDuplicados = [...new Set(carrito)];
  carritoSinDuplicados.forEach((item) => {
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      return itemBaseDatos.id === parseInt(item);
    });
    //número que se repite el producto
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      return itemId === item ? (total += 1) : total;
    }, 0);

    const miNodo = document.createElement("li");
    miNodo.classList.add("list-group-item", "text-right", "mx-2");
    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
    // Boton de borrar
    const miBoton = document.createElement("button");
    miBoton.classList.add("btn", "btn-danger", "mx-5");
    miBoton.textContent = "X";
    miBoton.style.marginLeft = "1rem";
    miBoton.dataset.item = item;
    miBoton.addEventListener("click", borrarItemCarrito);
    // Mezclamos
    miNodo.appendChild(miBoton);
    DOMcarrito.appendChild(miNodo);
  });
}

///borrar un elemento del carrito

function borrarItemCarrito(evento) {
  // producto ID
  const id = evento.target.dataset.item;
  // Borrar todo
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });

  renderizarCarrito();
  // Calcular precio
  calcularTotal();
  guardarCarritoEnLocalStorage();
}

function calcularTotal() {
  // Limpiar
  total = 0;
  // Recorremos el array del carrito
  carrito.forEach((item) => {
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      return itemBaseDatos.id === parseInt(item);
    });
    total = total + miItem[0].precio;
  });

  DOMtotal.textContent = total.toFixed(2);
}

function vaciarCarrito() {
  // Limpia productos guardados
  carrito = [];
  renderizarCarrito();
  calcularTotal();
  localStorage.clear();
}

function guardarCarritoEnLocalStorage() {
  miLocalStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
  if (miLocalStorage.getItem("carrito") !== null) {
    carrito = JSON.parse(miLocalStorage.getItem("carrito"));
  }
}

// Eventos
DOMbotonVaciar.addEventListener("click", vaciarCarrito);

// Inicio
cargarCarritoDeLocalStorage();
renderizarProductos();
calcularTotal();
renderizarCarrito();

//////////

//var imagenes = document.getElementById('img');
//if(imagenes&& imagenes.style) {
//    imagenes.style.height = '100px';
//    imagenes.style.width = '50px';
//}
//







//jquery///

$(document).ready(function () {
  $(".titulo").animate({ "font-size": "60px" }, 5000),
    $("body,html").css({ background: "#000"});
    $("img").css({width:"160px",height:"190px"})
    $("#sponsor").css({width:"500px",height:"400px"})

  $(".modoOscuro").click(function () {
    $("div").css({ background: "#000", color:"white"});
    $("#carrito").css({color:"#000"});
});
});
