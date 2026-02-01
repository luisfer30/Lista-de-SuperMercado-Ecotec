const formulario = document.getElementById("formularioProducto");
const inputNombre = document.getElementById("nombreProducto");
const inputCantidad = document.getElementById("cantidadProducto");

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
  Swal.fire({
    icon: "success",
    title: "Validación correcta",
    text: "Los datos son válidos. Producto listo para agregarse.",
    confirmButtonColor: "#2e7d32"
  });

});