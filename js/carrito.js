// js/carrito.js
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".agregar-carrito");

  botones.forEach(btn => {
    btn.addEventListener("click", function () {
      const juego = this.dataset.juego; 
      const sesion = JSON.parse(localStorage.getItem("sesion")); 

      if (!sesion || sesion.tipo !== "cliente") {
        localStorage.setItem("redirigirDespues", location.pathname); // volver a esta página tras login
        alert("Debes iniciar sesión para agregar juegos al carro de compras");
        window.location.href = "login.html";
        return;
      }

      let carrito = JSON.parse(localStorage.getItem("carrito")) || []; 

      const yaExiste = carrito.some(item => item.usuario === sesion.usuario && item.juego === juego);
      if (yaExiste) {
        alert("Este juego ya está en el carro de compras");
        return;
      }

      carrito.push({ juego, usuario: sesion.usuario });
      localStorage.setItem("carrito", JSON.stringify(carrito)); //actualiza carro

      alert(`"${juego}" fue agregado al carro de compras`);
    });
  });

  if (location.pathname.includes("carro-compras.html")) {
    const contenedor = document.getElementById("contenedor-carrito");
    const btnComprar = document.getElementById("btn-comprar");
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (!sesion || sesion.tipo !== "cliente") {
      window.location.href = "index.html";
      return;
    }

    const juegosUsuario = carrito.filter(j => j.usuario === sesion.usuario);

    if (juegosUsuario.length === 0) {
      contenedor.innerHTML = "<p>No hay juegos en tu carro de compras</p>";
    } else {
      const lista = document.createElement("ul");
      lista.classList.add("list-group", "mb-3");

      juegosUsuario.forEach((j, i) => {
        const item = document.createElement("li");
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        item.innerHTML = `
          ${j.juego}
          <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${i})">Eliminar</button>
        `;
        lista.appendChild(item);
      });

      contenedor.appendChild(lista);
      btnComprar.classList.remove("d-none");
    }

    btnComprar.addEventListener("click", () => {
      const nuevoCarrito = carrito.filter(j => j.usuario !== sesion.usuario);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      alert("Tu compra ha sido procesada correctamente. ¡Gracias por tu compra!");
      location.reload(); 
    });
  }
});

function eliminarDelCarrito(indice) {
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let indexGlobal = -1;
  let count = -1;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].usuario === sesion.usuario) {
      count++; 
      if (count === indice) {
        indexGlobal = i; 
        break;
      }
    }
  }

  if (indexGlobal !== -1) {
    carrito.splice(indexGlobal, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    location.reload();
  }
}
