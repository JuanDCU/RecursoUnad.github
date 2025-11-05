// TuRutaUNAD - script.js
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.sub-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      if (!content) return;
      const isHidden = content.classList.contains('hidden');
      content.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(isHidden));
      const ind = btn.querySelector('.toggle-indicator');
      if (ind) ind.textContent = isHidden ? '−' : '+';
      content.setAttribute('aria-hidden', String(!isHidden ? 'true' : 'false'));
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); btn.click();
      }
    });
  });

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

  console.info('TuRutaUNAD: interactividad lista, toggles y formulario simulado funcionando.');
});
