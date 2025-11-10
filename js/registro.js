document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-registro");
  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validarFormulario()) {
        const nombre = document.getElementById("nombre").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const email = document.getElementById("email").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const password = document.getElementById("password").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const existe = usuarios.some(u => u.email === email);

        if (existe) {
          alert("Ya existe una cuenta con ese correo.");
          return;
        }

        const nuevoUsuario = {
          nombre,
          usuario,
          email,
          fechaNacimiento,
          password,
          tipo: "cliente"
        };
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Registro exitoso. Ahora puedes iniciar sesión");
        formulario.reset();
        window.location.href = "login.html";
      }
    });
  }
});
