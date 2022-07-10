const btnRol = document.querySelector("[data-rol]");
btnRol.addEventListener("click", ()=>{
    const rol = sessionStorage.getItem("rol");
    const newRol = (rol == "admin") ? "user" : "admin";
    sessionStorage.setItem("rol", newRol);
    Swal.fire({
        title: `<strong>Testeando como ${newRol}</strong>`,
        icon: 'warning',
        html:
          `Usted esta probando la API como "${newRol}"` ,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        focusConfirm: false,
        timer: 2000
      }).then(res=>{
        btnRol.textContent = `Probar API rutas admin como "${rol}"`
      })
});