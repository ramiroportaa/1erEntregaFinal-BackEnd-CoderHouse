//Animacion de bienvenida
function fadeOutEffect(fadeTarget, ms) {
    const fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            fadeTarget.classList.add("d-none");
            clearInterval(fadeEffect);
        }
    }, ms);
}
document.addEventListener("DOMContentLoaded", ()=>{
    const fadeTarget = document.getElementById("bienvenida");
    fadeOutEffect(fadeTarget, 100);
})

//Almacenamiento en SessionStorage del Rol de usuario y redireccionamiento a tienda.
const rolButtons = document.querySelectorAll("button");
rolButtons.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        sessionStorage.setItem("rol", btn.dataset.rol);
        (btn.dataset.rol == "admin") ? location.replace("admin.html") : location.replace("tienda.html");
    });
})