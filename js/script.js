const STORAGE_KEY = "lista_supermercado_ecotec_v1";
let productos = [];

const formulario = document.getElementById("formularioProducto");
const inputNombre = document.getElementById("nombreProducto");
const inputCantidad = document.getElementById("cantidadProducto");
const lista = document.getElementById("listaProductos");
const contadorTotal = document.getElementById("total");
const contadorComprados = document.getElementById("totalComprado");
const contadorPendientes = document.getElementById("pendientes");

function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = inputNombre.value.trim();
  const cantidad = inputCantidad.value.trim();

if (nombre === "" && cantidad === "") {
    Swal.fire({
      icon: "error",
      title: "Campos obligatorio",
      text: "Todos los campos son obligatorios",
      confirmButtonColor: "#0d47a1"
    });
    return;
  }
  if (nombre === "") {
    Swal.fire({
      icon: "info",
      title: "Campo obligatorio",
      text: "El nombre del producto no puede estar vacío",
      confirmButtonColor: "#0d47a1"
    });
    return;
  }
   if (cantidad === "") {
    Swal.fire({
      icon: "info",
      title: "Campo obligatorio",
      text: "La cantidad no puede estar vacía",
      confirmButtonColor: "#0d47a1"
    });
    return;
  }
  if (Number(cantidad) <= 0) {
    Swal.fire({
      icon: "info",
      title: "Cantidad inválida",
      text: "La cantidad debe ser mayor a 0",
      confirmButtonColor: "#0d47a1"
    });
    return;
  }

  const productoLS = {
    id: generarId(),
    nombre: nombre,
    cantidad: Number(cantidad),
    comprado: false
  };
  
  productos.push(productoLS);
  guardarLocalStorage();
  
  agregarProductoLista(productoLS);
  
  Swal.fire({
    icon: "success",
    title: "Agregado",
    text: "Producto insertado en la lista",
    timer: 2000,
    showConfirmButton: false,
  });
  
  inputNombre.value = "";
  inputCantidad.value = "";
  inputNombre.focus();
});

function agregarProductoLista(producto) {
    const tr = document.createElement("tr");
    tr.dataset.id = producto.id;
  
    if (producto.comprado) tr.classList.add("comprado");
  
    const tdNombre = document.createElement("td");
    tdNombre.textContent = producto.nombre;
  
    const tdCantidad = document.createElement("td");
    tdCantidad.textContent = producto.cantidad;
  
    const tdAcciones = document.createElement("td");
  
    const btnComprado = document.createElement("button");
    btnComprado.type = "button";
    btnComprado.classList.add("btn");

    if (producto.comprado) {
      btnComprado.textContent = "Pendiente";
      btnComprado.classList.add("btn-pendiente");
    } else {
      btnComprado.textContent = "Comprado";
      btnComprado.classList.add("btn-comprado");
    }
  
    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn", "btn-eliminar");
  
    btnComprado.addEventListener("click", () => {
      tr.classList.toggle("comprado");

      producto.comprado = tr.classList.contains("comprado");
      guardarLocalStorage();
      actualizarContadores();
  
      if (producto.comprado) {
        btnComprado.textContent = "Pendiente";
        btnComprado.classList.remove("btn-comprado");
        btnComprado.classList.add("btn-pendiente");
      } else {
        btnComprado.textContent = "Comprado";
        btnComprado.classList.remove("btn-pendiente");
        btnComprado.classList.add("btn-comprado");
      }
    });
  
    btnEliminar.addEventListener("click", () => {
      productos = productos.filter(p => p.id !== producto.id);
      guardarLocalStorage();
  
      tr.remove();
      actualizarContadores();
    });
  
    tdAcciones.appendChild(btnComprado);
    tdAcciones.appendChild(btnEliminar);
  
    tr.appendChild(tdNombre);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdAcciones);
  
    lista.appendChild(tr);
    actualizarContadores();
  }

  function actualizarContadores() {
    const filas = lista.querySelectorAll("tr");
    const comprados = lista.querySelectorAll("tr.comprado");
  
    contadorTotal.textContent = filas.length;
    contadorComprados.textContent = comprados.length;
    contadorPendientes.textContent = filas.length - comprados.length;
  }

  function guardarLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  }

  function cargarLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  (function init() {
    productos = cargarLocalStorage();
    lista.innerHTML = "";
    productos.forEach(agregarProductoLista);
    actualizarContadores();
  })();