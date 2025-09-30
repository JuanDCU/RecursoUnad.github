document.addEventListener("DOMContentLoaded", function() {
    let subsecciones = document.querySelectorAll(".subseccion");
    subsecciones.forEach(subseccion => {
        subseccion.addEventListener("click", function() {
            this.classList.toggle("active");
            let contenidos = this.querySelectorAll("p, img, video, iframe, a.btn");
            contenidos.forEach(c => c.classList.toggle("hidden"));
        });
    });
});