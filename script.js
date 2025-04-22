document.addEventListener("DOMContentLoaded", function() {
    let subsecciones = document.querySelectorAll(".subseccion");
    subsecciones.forEach(subseccion => {
        subseccion.addEventListener("click", function() {
            let contenido = this.querySelector("p");
            let multimedia = this.querySelector("img, video");
            contenido.classList.toggle("hidden");
            if (multimedia) {
                multimedia.classList.toggle("hidden");
            }
        });
    });
});
