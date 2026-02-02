const formulario = document.getElementById("formularioProducto");
const inputNombre = document.getElementById("nombreProducto");
const inputCantidad = document.getElementById("cantidadProducto");
const lista = document.getElementById("listaProductos");

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

  agregarProductoLista(nombre, cantidad);
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

function agregarProductoLista(nombre, cantidad) {
    const tr = document.createElement("tr");
  
    const tdNombre = document.createElement("td");
    tdNombre.textContent = nombre;
  
    const tdCantidad = document.createElement("td");
    tdCantidad.textContent = cantidad;
  
    const tdAcciones = document.createElement("td");

    const btnComprado = document.createElement("button");
    btnComprado.type = "button";
    btnComprado.textContent = "Comprado";
    btnComprado.classList.add("btn","btn-comprado");
  
    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn","btn-eliminar"); 

    btnComprado.addEventListener("click", () => {
        tr.classList.toggle("comprado");
    
        if (tr.classList.contains("comprado")) {
          btnComprado.textContent = "Pendiente";
        } else {
          btnComprado.textContent = "Comprado";
        }
      });

    btnEliminar.addEventListener("click", () => {
        tr.remove();
      });
    
    tdAcciones.appendChild(btnComprado);
    tdAcciones.appendChild(btnEliminar);

    tr.appendChild(tdNombre);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdAcciones);
  
    lista.appendChild(tr);
  }