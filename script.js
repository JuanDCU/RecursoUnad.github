// TuRutaUNAD - script.js
document.addEventListener('DOMContentLoaded', () => {
  
  // Obtenemos la altura del encabezado para el desplazamiento suave
  const siteHeader = document.querySelector('.site-header');
  // Usar 70px como fallback si el header no existe (pero debería)
  const headerHeight = siteHeader ? siteHeader.offsetHeight + 10 : 70; 

  // --- 1. Funcionalidad de Toggles (Sub-secciones colapsables) ---
  const toggles = document.querySelectorAll('.sub-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      // CLAVE: El contenido a mostrar DEBE ser el elemento hermano inmediato
      const content = btn.nextElementSibling; 
      if (!content) return; // Si no encuentra el elemento, se detiene
      
      const isHidden = content.classList.contains('hidden');
      content.classList.toggle('hidden');
      
      btn.setAttribute('aria-expanded', String(isHidden));
      const ind = btn.querySelector('.toggle-indicator');
      
      // Actualiza el texto del indicador (+ o −)
      if (ind) ind.textContent = isHidden ? '−' : '+'; 
      
      content.setAttribute('aria-hidden', String(!isHidden ? 'true' : 'false'));
    });
    
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); 
        btn.click();
      }
    });
  });

  // --- 2. Funcionalidad de Formulario Simulada ---
  const form = document.getElementById('mat-form');
  const resetBtn = document.getElementById('form-reset');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('f-nombre').value.trim();
      const correo = document.getElementById('f-correo').value.trim();
      const programa = document.getElementById('f-programa').value.trim();
      const semestre = document.getElementById('f-semestre').value.trim();
      
      if (!nombre || !correo || !programa || !semestre) {
        alert('Por favor completa todos los campos requeridos.');
        return;
      }
      
      const resumen = `Solicitud simulada de matrícula\n\nNombre: ${nombre}\nCorreo: ${correo}\nPrograma: ${programa}\nSemestre: ${semestre}\n\nGuarda una captura de esta pantalla como evidencia.`;
      alert(resumen);
      form.reset();
    });
    resetBtn.addEventListener('click', () => form.reset());
  }

  // --- 3. Desplazamiento Suave (Smooth Scroll) y Estado Activo ---
  
  // Smooth Scroll para enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.closest('.main-nav')) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight, 
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Resaltar Sección Activa (Active State)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - headerHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Inicializa el estado

  
  
});
