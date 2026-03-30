document.addEventListener('DOMContentLoaded', () => {

  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  const botonesFiltro = document.querySelectorAll('.btn-filtro');
  const tarjetas = document.querySelectorAll('.card');
  const contador = document.getElementById('contador-servicios');
  const heroTitle = document.getElementById('hero-title');

  botonesFiltro.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('active'));
      boton.classList.add('active');

      const categoriaSeleccionada = boton.getAttribute('data-filter');
      let visibles = 0;

      tarjetas.forEach(tarjeta => {
        const categoriaTarjeta = tarjeta.getAttribute('data-category');
        
        if (categoriaSeleccionada === 'todos' || categoriaSeleccionada === categoriaTarjeta) {
          tarjeta.classList.remove('oculto');
          visibles++;
        } else {
          tarjeta.classList.add('oculto');
        }
      });

      contador.textContent = `Mostrando ${visibles} servicio${visibles !== 1 ? 's' : ''}`;
      
      if (categoriaSeleccionada === 'seguridad') {
        heroTitle.textContent = "Protegemos tus activos digitales";
      } else if (categoriaSeleccionada === 'desarrollo') {
        heroTitle.textContent = "Construimos tu presencia web";
      } else {
        heroTitle.textContent = "Soluciones Tecnológicas de Alto Nivel";
      }
    });
  });

  const botonesDetalle = document.querySelectorAll('.btn-detalle');
  botonesDetalle.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tarjetaActual = e.target.closest('.card');
      tarjetas.forEach(t => t.style.borderColor = 'rgba(255,255,255,0.05)');
      tarjetaActual.style.borderColor = '#00e5ff';
      btn.textContent = "¡Seleccionado!";
      setTimeout(() => btn.textContent = "Saber más", 2000);
    });
  });

  const formulario = document.getElementById('form-contacto');
  const inputs = {
    nombre: document.getElementById('nombre'),
    correo: document.getElementById('correo'),
    servicio: document.getElementById('servicio-interes'),
    mensaje: document.getElementById('mensaje')
  };

  const mostrarError = (input, mensaje) => {
    const spanError = document.getElementById(`error-${input.id.split('-')[0]}`);
    spanError.textContent = mensaje;
    input.style.borderColor = '#ff4d4d';
  };

  const limpiarErrores = () => {
    document.querySelectorAll('.error-msg').forEach(span => span.textContent = '');
    Object.values(inputs).forEach(input => input.style.borderColor = 'rgba(255,255,255,0.1)');
  };

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErrores();
    let esValido = true;

    if (inputs.nombre.value.trim() === '') {
      mostrarError(inputs.nombre, 'El nombre es obligatorio.');
      esValido = false;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputs.correo.value.trim() === '') {
      mostrarError(inputs.correo, 'El correo es obligatorio.');
      esValido = false;
    } else if (!regexCorreo.test(inputs.correo.value.trim())) {
      mostrarError(inputs.correo, 'Formato de correo inválido.');
      esValido = false;
    }

    if (inputs.servicio.value === '') {
      mostrarError(inputs.servicio, 'Por favor selecciona un servicio.');
      esValido = false;
    }

    if (inputs.mensaje.value.trim().length < 10) {
      mostrarError(inputs.mensaje, 'El mensaje debe tener al menos 10 caracteres.');
      esValido = false;
    }

    if (esValido) {
      document.getElementById('form-exito').classList.remove('oculto');
      formulario.reset();
      setTimeout(() => {
        document.getElementById('form-exito').classList.add('oculto');
      }, 4000);
    }
  });

});
