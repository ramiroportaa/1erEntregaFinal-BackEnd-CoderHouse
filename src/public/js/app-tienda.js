const productosHTML = document.getElementById("productos");
const initial = async ()=>{
    await getProductsFromAPI();
    escribirProductosHTML(productos);
    escribirModalesHTML(productos);
    if (idCart){
        await getProductsCartFromAPI(idCart);
    }else{
        idCart = await createCartAPI();
        sessionStorage.setItem("idCart", idCart);
    }
}
initial();
