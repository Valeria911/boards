document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  const nav = document.querySelector(".navbar-nav");

  if (!nav) return;

  //basicos
  let linksBase = `
    <li class="nav-item"><a class="nav-link active" href="index.html">Inicio</a></li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
        aria-expanded="false">Categorías</a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="categoria-medieval.html">Medieval</a></li>
          <li><a class="dropdown-item" href="categoria-cartas.html">Cartas</a></li>
          <li><a class="dropdown-item" href="categoria-ingenio.html">Ingenio</a></li>
        </ul>
    </li>
  `;

  if (sesion?.logueado) {
    if (sesion.tipo === "admin") {
      linksBase +=  
      ` 
        <li class="nav-item"><a class="nav-link" href="administrador.html">Administrar</a></li>
        <li class="nav-item"><a class="nav-link" href="#" id="cerrar-sesion">Cerrar sesión</a></li>
      `;
    } else if (sesion.tipo === "cliente") {
      linksBase +=
      `
        <li class="nav-item"><a class="nav-link" href="mi-perfil.html">Ver mi perfil</a></li>
        <li class="nav-item"><a class="nav-link" href="carro-compras.html">Carro de compras</a></li>
        <li class="nav-item"><a class="nav-link" href="#" id="cerrar-sesion">Cerrar sesión</a></li>
      `;
    }
  } else {
    linksBase += `
       <li class="nav-item"><a class="nav-link" href="registro.html">Registro</a></li>
       <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
       `;
  }

  nav.innerHTML = linksBase;

  const cerrarSesionBtn = document.getElementById("cerrar-sesion");
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("sesion");
      window.location.href = "index.html";
    });
  }
});
