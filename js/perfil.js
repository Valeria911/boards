document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("sesion")); 
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (!sesion || sesion.tipo !== "cliente") {
    window.location.href = "index.html";
    return;
  }
  const usuarioLogueado = usuarios.find(
    u => u.email === sesion.usuario || u.usuario === sesion.usuario
  );

  if (usuarioLogueado) {
    document.getElementById("nombre").value = usuarioLogueado.nombre || "";
    document.getElementById("usuario").value = usuarioLogueado.usuario || "";
    document.getElementById("email").value = usuarioLogueado.email || "";
    document.getElementById("fechaNacimiento").value = usuarioLogueado.fechaNacimiento || "";
  }

  const form = document.getElementById("form-perfil");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const nombreValido = validarCampoVacio("nombre");
    const usuarioValido = validarCampoVacio("usuario");
    const fechaValida = validarFechaNacimiento("fechaNacimiento");

    if (!nombreValido || !usuarioValido || !fechaValida) {
      return;
    }
    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;

    const index = usuarios.findIndex(u => u.email === usuarioLogueado.email);
    if (index !== -1) {
      usuarios[index].nombre = nombre;
      usuarios[index].usuario = usuario;
      usuarios[index].fechaNacimiento = fechaNacimiento;

      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      sesion.usuario = usuario;
      localStorage.setItem("sesion", JSON.stringify(sesion));

      alert("Se han guardado los cambios en tu perfil");
    }
  });
});
