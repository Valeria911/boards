document.addEventListener("DOMContentLoaded", () => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const existeAdmin = usuarios.some(user => user.email === "admin@boards.cl");
  if (!existeAdmin) {
    const admin = {
      nombre: "Administrador",      
      usuario: "admin",          
      email: "admin@boards.cl",   
      password: "Admin123",       
      tipo: "admin"             
    };

    usuarios.push(admin);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log("admin creado por defecto");
  }
});

function login(email, password) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    localStorage.setItem("sesion", JSON.stringify({
      logueado: true,
      usuario: usuario.usuario, 
      tipo: usuario.tipo       
    }));
    const destino = localStorage.getItem("redirigirDespues") || "index.html";
    localStorage.removeItem("redirigirDespues"); 
    window.location.href = destino; 
  } else {
    alert("Usuario no encontrado o contraseña incorrecta");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");

  if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault(); 
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (email && password) {
        login(email, password);
      } else {
        alert("Completa todos los campos");
      }
    });
  }
});
