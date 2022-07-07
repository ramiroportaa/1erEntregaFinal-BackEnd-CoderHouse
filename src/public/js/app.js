const rol = sessionStorage.getItem("rol");

//Creamos un array para agrupar todos los productos que se ofrecen.
const productos = []

//Creamos un array para agrupar todos los productos que se añaden al carrito.
let cart = [];
//Obtener el id del cart del usuario.
let idCart = JSON.parse(sessionStorage.getItem("idCart")) || 0;

//Funciones de inteaccion con la API
    //Fetchs a /api/productos
        //Obtener todos los productos y pushearlos al array de productos.
const getProductsFromAPI = async ()=>{
    let res = await fetch("/api/productos");
    const data = await res.json();
    data.products.forEach(prod =>{
        productos.push(prod);
    })
}
        //Obtener un solo producto por su ID.
const getProductByIdFromAPI = async (id)=>{
    let res = await fetch(`/api/productos/${id}`);
    const data = await res.json();
    if (res.status == 404) return alertaInfo(data);
    return data;
}
        //Actualizar un producto pasandole un objeto con las propiedades a cambiar.
const updateProductAPI = async (id, obj)=>{
    const productUpdateData = JSON.stringify(obj);
    let res = await fetch(`/api/productos/${id}`, {
        method: "PUT",
        headers:{'Content-Type': 'application/json', "rol": `${rol}`},
        body: productUpdateData
    });
    if (res.status != 204){
        const data = await res.json();
        return alertaInfo(data?.error);
    }
    alertaInfo("producto actualizado exitosamente");
}
        //crear un producto pasandole un objeto con las propiedades del mismo.
const addProductAPI = async (obj)=>{
    const productAddData = JSON.stringify(obj);
    let res = await fetch(`/api/productos`, {
        method: "POST",
        headers:{'Content-Type': 'application/json', "rol": `${rol}`},
        body: productAddData
    });
    if (res.status != 201){
        const data = await res.json();
        return alertaInfo(data?.error);
    } 
    alertaInfo("Producto creado exitosamente");
}
        //Eliminar un producto por id.
const deleteProductAPI = async (id)=>{
    let res = await fetch(`/api/productos/${id}`, {
        method: "DELETE",
        headers:{"rol": `${rol}`}
    });
    if (res.status != 204){
        const data = await res.json();
        return alertaInfo(data?.error);
    }
    alertaInfo("Producto eliminado exitosamente");
}

    //Fetchs a /api/carrito
        //Obtener los productos existentes en el carrito del usuario y pushearlos al array de cart.
const getProductsCartFromAPI = async (id)=>{
    let res = await fetch(`/api/carrito/${id}/productos`);
    const data = await res.json();
    if (res.status == 404){
        idCart = await createCartAPI();
        sessionStorage.setItem("idCart", idCart);
    }
    cart = data.products;
}
        //Crear un carrito en la API y obtener su ID.
const createCartAPI = async ()=>{
    let res = await fetch("/api/carrito",{
        method: "POST"
    });
    const data = await res.json();
    if (res.status != 201) return alertaInfo(data);
    return data.idCart;
}
        //Eliminar un carrito completo de la API.
const deleteCartAPI = async (id)=>{
    let res = await fetch(`/api/carrito/${id}`,{
        method: "DELETE"
    });
    if (res.status != 204){
        const data = await res.json();
        return alertaInfo(data);  
    } 
    alertaInfo("Carrito eliminado exitosamente");
}
        //Agregar un producto al carrito en la API.
const addProductCartAPI = async (idC, idProd, quantity=1)=>{
    try {
        const obj = {
            idProd: idProd,
            quantity: quantity
        }
        let res = await fetch(`/api/carrito/${idC}/productos`,{
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status != 204){
            const data = await res.json();
            return alertaInfo(data);
        }
        alertaInfo("Producto agregado al carrito exitosamente");
    } catch (error) {
        alertaInfo(error.message)
    }
}
        //Eliminar un producto de un carrito en la API.
const deleteProductCartAPI = async (idC, idP)=>{
    let res = await fetch(`/api/carrito/${idC}/productos/${idP}`,{
        method: "DELETE"
    });
    if (res.status != 204){
        const data = await res.json();
        return alertaInfo(data);
    } 
    alertaInfo("Producto eliminado exitosamente del carrito");
}

//Funciones para cambiar la clase del dialogoInfo luego de 2 segundos... Estas funciones son llamadas al hacer ejecutar la funcion "comprar".
const dialogoInfo = document.getElementById("dialogoInfo");
function verAlerta() {
    dialogoInfo.classList.toggle("dialogoInfo-active");
}
let identificadorDeTemporizador;
function temporizadorAlerta() {
  identificadorDeTemporizador = setTimeout(verAlerta, 2000);
}
function alertaInfo(contenidoHTML){
    dialogoInfo.innerHTML = contenidoHTML;
    verAlerta();
    temporizadorAlerta();
}
