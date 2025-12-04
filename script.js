// --- FUNCIÓN DE NAVEGACIÓN GLOBAL ---
// Está fuera del evento para ser accesible desde el HTML siempre.
function navigate(viewId, btnElement) {
    // 1. Ocultar todas las secciones
    const allSections = document.querySelectorAll('section');
    allSections.forEach(section => {
        section.classList.add('hidden');
    });

    // 2. Mostrar la sección seleccionada
    const targetId = 'view-' + viewId;
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
        targetSection.classList.remove('hidden');
        // Scroll arriba
        document.querySelector('.main-content').scrollTop = 0;
    }

    // 3. Actualizar botones activos
    if (btnElement) {
        const allButtons = document.querySelectorAll('.nav-btn');
        allButtons.forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }

    // 4. Cerrar menú móvil
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('active');
    }
}

// --- LÓGICA DE LA APLICACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOGIN ---
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const app = document.getElementById('app');
    const displayUser = document.getElementById('display-name');

    // Verificar usuario guardado
    const savedUser = localStorage.getItem('turuta_user');
    if (savedUser) {
        iniciarApp(savedUser);
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('username').value.trim();
        if (name) {
            localStorage.setItem('turuta_user', name);
            iniciarApp(name);
        }
    });

    function iniciarApp(name) {
        if(displayUser) displayUser.textContent = name;
        if(loginOverlay) {
            loginOverlay.style.opacity = '0';
            setTimeout(() => {
                loginOverlay.style.display = 'none';
                app.classList.remove('hidden');
            }, 500);
        }
        cargarProgreso();
    }

    // --- SALIR ---
    document.getElementById('btn-logout').addEventListener('click', () => {
        if(confirm("¿Deseas cerrar sesión?")) {
            localStorage.removeItem('turuta_user');
            location.reload();
        }
    });

    // --- MENÚ MÓVIL ---
    const menuBtn = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');

    if(menuBtn) menuBtn.addEventListener('click', () => sidebar.classList.add('active'));
    if(closeBtn) closeBtn.addEventListener('click', () => sidebar.classList.remove('active'));

    // --- CHECKLIST ---
    const checks = document.querySelectorAll('.task-check');
    const bar = document.getElementById('main-progress-bar');
    const txt = document.getElementById('progress-percent');

    function cargarProgreso() {
        checks.forEach(c => {
            if (localStorage.getItem(c.id) === 'true') c.checked = true;
            c.addEventListener('change', actualizarBarra);
        });
        actualizarBarra();
    }

    function actualizarBarra() {
        const total = checks.length;
        const done = Array.from(checks).filter(c => c.checked).length;
        const pct = Math.round((done / total) * 100);
        
        if(bar) bar.style.width = pct + '%';
        if(txt) txt.textContent = pct + '%';
        
        checks.forEach(c => localStorage.setItem(c.id, c.checked));
    }

    // --- SIMULADOR DE COSTOS ---
    const simForm = document.getElementById('simulador-form');
    if (simForm) {
        const range = document.getElementById('range-creditos');
        const display = document.getElementById('creditos-val');
        
        range.addEventListener('input', (e) => display.textContent = e.target.value);

        simForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const creds = parseInt(range.value);
            const desc = parseFloat(document.getElementById('sel-descuento').value);
            const valCredito = 112000; // Valor ref 2025
            const seguro = 9000;
            
            const subtotal = creds * valCredito;
            const descuento = subtotal * desc;
            const total = subtotal - descuento + seguro;
            
            const fmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
            document.getElementById('total-pago').textContent = fmt.format(total);
            document.getElementById('resultado-simulador').style.display = 'block';
        });
    }
});
