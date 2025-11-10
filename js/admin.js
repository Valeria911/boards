document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (!sesion || sesion.tipo !== "admin") {
    alert("Acceso denegado. Debes iniciar sesión como administrador.");
    window.location.href = "login.html";
    return;
  }
  cargarUsuarios();
});

  function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const tabla = document.getElementById("tabla-usuarios");
    tabla.innerHTML = "";

    usuarios.forEach((user, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
      <td>${index + 1}</td> 
      <td>${user.nombre || "-"}</td> 
      <td>${user.usuario || "-"}</td> 
      <td>${user.email}</td> 
      <td>${user.fechaNacimiento || "-"}</td> 
      <td>${user.tipo || "cliente"}</td> 
      <td>
        <!-- editar usuario -->
        <button class="btn btn-warning btn-sm me-2" onclick="editarUsuario(${index})">Editar</button>
        <!-- eliminar usuario -->
        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button>
      </td>
    `;
      tabla.appendChild(fila);
    });
}

  function editarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const usuario = usuarios[index];

    const nuevoNombre = prompt("Nuevo nombre completo:", usuario.nombre);
    const nuevoUsuario = prompt("Nuevo nombre de usuario:", usuario.usuario);
    const nuevoCorreo = prompt("Nuevo correo:", usuario.email);

    if (nuevoNombre && nuevoUsuario && nuevoCorreo) {
      usuarios[index].nombre = nuevoNombre;
      usuarios[index].usuario = nuevoUsuario;
      usuarios[index].email = nuevoCorreo;

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Se actualizó el usuario");
      location.reload();
    }
  }

  function eliminarUsuario(index) {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (confirm("Estás a punto de eliminar este usuario ¿Confirmas?")) {
      usuarios.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Se eliminó el usuario");
      location.reload();
    }
  }
