//validar todo el formulario
function validarFormulario() {
  let esValido = true; 
  esValido &= validarCampoVacio("nombre"); 
  esValido &= validarCampoVacio("usuario"); 
  esValido &= validarEmail("email"); 
  esValido &= validarFechaNacimiento("fechaNacimiento");
  esValido &= validarPassword("password", "confirmarPassword"); 

  return Boolean(esValido); 
}

function validarCampoVacio(idCampo) {
  const campo = document.getElementById(idCampo); 
  if (campo.value.trim() === "") { 
    campo.classList.add("is-invalid"); 
    return false;
  } else {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    return true;
  }
}

function validarEmail(idCampo) {
  const campo = document.getElementById(idCampo);
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(campo.value.trim())) {
    campo.classList.add("is-invalid");
    return false;
  } else {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    return true;
  }
}

function validarFechaNacimiento(idCampo) {
  const campo = document.getElementById(idCampo);
  const fecha = new Date(campo.value);
  const hoy = new Date(); 
  const edad = hoy.getFullYear() - fecha.getFullYear();

  const edadReal = (
    edad > 12 ||
    (edad === 12 && hoy >= new Date(fecha.setFullYear(fecha.getFullYear() + 12)))
  );

  if (!edadReal) {
    campo.classList.add("is-invalid");
    return false;
  } else {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    return true;
  }
}

function validarPassword(idPassword, idConfirmar) {
  const pass = document.getElementById(idPassword); 
  const confirm = document.getElementById(idConfirmar);
  //mínimo 8 caracteres, al menos una mayúscula, al menos un número
  const regexSegura = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  let valido = true;
  if (!regexSegura.test(pass.value)) {
    pass.classList.add("is-invalid");
    valido = false;
  } else {
    pass.classList.remove("is-invalid");
    pass.classList.add("is-valid");
  }
  if (pass.value !== confirm.value || confirm.value === "") {
    confirm.classList.add("is-invalid");
    valido = false;
  } else {
    confirm.classList.remove("is-invalid");
    confirm.classList.add("is-valid");
  }
  return valido;
}
