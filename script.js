// TuRutaUNAD - script.js (Consolidado)
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Configuración de cabecera y variables globales
  const siteHeader = document.querySelector('.site-header');
  const headerHeight = siteHeader ? siteHeader.offsetHeight : 70;

  // --- 2. Funcionalidad de Acordeón (Toggles) ---
  const toggles = document.querySelectorAll('.sub-toggle');
  
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      if (!content) return;

      const isHidden = content.classList.contains('hidden');
      
      // Cerrar otros (Opcional - para comportamiento de acordeón estricto, descomentar la siguiente línea)
      // document.querySelectorAll('.sub-content').forEach(el => el.classList.add('hidden'));

      // Abrir/Cerrar el actual
      if (isHidden) {
        content.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        const ind = btn.querySelector('.toggle-indicator');
        if(ind) ind.textContent = '−';
      } else {
        content.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        const ind = btn.querySelector('.toggle-indicator');
        if(ind) ind.textContent = '+';
      }
    });
  });

  // --- 3. Simulación de Formulario de Matrícula ---
  const form = document.getElementById('mat-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Obtención segura de valores
      const nombre = document.getElementById('f-nombre').value.trim();
      const correo = document.getElementById('f-correo').value.trim();
      const programa = document.getElementById('f-programa').value.trim();
      const semestre = document.getElementById('f-semestre').value;
      
      if (!nombre || !correo || !programa || !semestre) {
        alert('Por favor complete todos los campos obligatorios.');
        return;
      }

      // Mensaje de simulación
      const mensaje = `
        -----------------------------------
        SIMULACIÓN DE MATRÍCULA EXITOSA
        -----------------------------------
        Estudiante: ${nombre}
        Programa: ${programa}
        Créditos: ${semestre}
        
        Notificación enviada a: ${correo}
        
        *Esto es solo una simulación educativa.*
      `;
      
      alert(mensaje);
      form.reset();
    });

    const resetBtn = document.getElementById('form-reset');
    if(resetBtn) resetBtn.addEventListener('click', () => form.reset());
  }

  // --- 4. Navegación Suave (Smooth Scroll) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Solo actuar si el enlace es interno
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 10;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // --- 5. Animación "Scroll Reveal" (Requisito de Impacto) ---
  const sectionsToAnimate = document.querySelectorAll('main section');
  
  const checkVisibility = () => {
    const triggerBottom = window.innerHeight * 0.85; // Punto de activación
    
    sectionsToAnimate.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      
      // Si la sección entra en el viewport
      if (sectionTop < triggerBottom) {
        section.classList.add('is-revealed');
      }
    });
  };

  // Escuchar el evento scroll
  window.addEventListener('scroll', checkVisibility);
  // Chequeo inicial
  checkVisibility();

  console.log('TuRutaUNAD: Sistema cargado correctamente v2.0');
});
