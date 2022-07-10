function escribirProductosHTML (arrayProductos, columnas=3) {
    if (!arrayProductos.length){
        productosHTML.innerText = "NO HAY PRODUCTOS PARA MOSTRAR"
        return
    }
    arrayProductos.forEach((producto) => {
        let contenedor = document.createElement("div");
        contenedor.className = `col-xl-${columnas} col-lg-${columnas} col-sm-6`
        //Definimos el innerHTML del elemento con una plantilla de texto
        contenedor.innerHTML = `<!-- PRODUCT ${producto.id}-->
                        <div class="product text-center">
                        <div class="mb-3 position-relative">
                            <div class="badge text-black badge-primary">${(producto.stock > 0) ? "DISPONIBLE" : "AGOTADO"}</div><a class="d-block" href="#productView-${producto.id}" data-bs-toggle="modal"><img class="img-fluid w-100" src="${producto.foto}" alt="${producto.nombre}"></a>
                            <div class="product-overlay">
                            <ul class="mb-0 list-inline">
                                <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="#productView-${producto.id}" data-bs-toggle="modal">Editar</a></li>
                                <li class="list-inline-item me-0"><a id="borrarProducto-${producto.id}" class="btn btn-sm btn-outline-danger"><i class="fas fa-trash-alt small"></i></a></li>
                            </ul>
                            </div>
                        </div>
                        <h6 class="reset-anchor"> <a  href="#productView-${producto.id}" data-bs-toggle="modal">${producto.nombre}</a></h6>
                        <p class="small text-muted">$${producto.precio}.-</p>
                                </div>`;
        productosHTML.appendChild(contenedor);
        //Almacenamos en constante el nodo de cada boton "agregar al carrito"
        const borrarProducto = document.getElementById(`borrarProducto-${producto.id}`);
        //Añadimos manejador de evento click a dicho nodo.
        borrarProducto.addEventListener("click", async () => {
            Swal.fire({
                title: 'Estas seguro?',
                text: `Borraras el producto ${producto.nombre}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteProductAPI(Number(producto.id)).then(res => {
                        initial();
                      })
                }
              })
        });
    })
}
function escribirModalesHTML (arrayProductos){
    const modales = document.getElementById("modales");
    if (!arrayProductos.length) return;
    arrayProductos.forEach((producto) => {
        let contenedor = document.createElement("div");
        contenedor.className = "modal fade"
        contenedor.id = `productView-${producto.id}`
        contenedor.tabIndex = "-1"
        contenedor.role = "dialog"
        contenedor.ariaHidden = "true"
        //Definimos el innerHTML del elemento con una plantilla de texto
        contenedor.innerHTML = `<!-- modal para editar producto-${producto.id}-->
                                <div class="modal-dialog modal-dialog-scrollable modal-fullscreen" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body p-3">
                                            <div class="row align-items-stretch">
                                                <button class="btn-close p-4" type="button" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                                                <h4 class="text-center">Editando Producto id: ${producto.id}</h4>
                                                
                                                <div class="col-lg-6">
                                                    <h5 class="text-center">Datos actuales</h5>
                                                    <div class="p-5 my-md-4">
                                                        <p class="mb-4"><span class="fw-bold">Nombre:</span> ${producto.nombre}</p>
                                                        <p class="mb-4"><span class="fw-bold">Precio:</span> $${producto.precio}.-</p>
                                                        <p class="mb-4"><span class="fw-bold">Descripcion:</span> ${producto.descripcion}</p>
                                                        <p class="mb-4"><span class="fw-bold">Codigo:</span> ${producto.codigo}</p>
                                                        <p class="mb-4"><span class="fw-bold">Stock:</span> ${producto.stock}</p>
                                                        <p class="mb-4"><span class="fw-bold">Url de foto:</span> ${producto.foto}</p>
                                                        <div class="mt-3 d-block m-auto col-sm-5 pl-sm-0"><a id="borrarProducto-${producto.id}-modal" class="btn btn-danger btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0">Borrar producto</a></div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-6">
                                                    <h5 class="text-center">Ingrese datos a cambiar: </h5>
                                                    <div class="p-5 my-md-4">
                                                        <form id="editarProducto-${producto.id}-modal">
                                                        <label for="nombre" class="form-label">Nombre</label>
                                                        <input type="text" name="nombre" class="form-control" placeholder="${producto.nombre}">
                                                        <label for="descripcion" class="form-label">Descripcion</label>
                                                        <input type="text" name="descripcion" class="form-control" placeholder="${producto.descripcion}">
                                                        <label for="codigo" class="form-label">Codigo</label>
                                                        <input type="text" name="codigo" class="form-control" placeholder="${producto.codigo}">
                                                        <div class="d-flex my-3">
                                                            <label for="precio" class="form-label">Precio</label>
                                                            <input class="mx-2" type="number" name="precio" step=".01" class="form-control" placeholder="${producto.precio}">
                                                            <label for="stock" class="form-label">Stock</label>
                                                            <input class="ms-2" type="number" name="stock" class="form-control" placeholder="${producto.stock}">
                                                        </div>
                                                        <label for="foto" class="form-label">Url de foto</label>
                                                        <input type="text" name="foto" class="form-control" placeholder="${producto.foto}">

                                                        <button type="submit" class="btn btn-success mt-3 d-block m-auto text-center">Editar</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
        modales.appendChild(contenedor);

        //Asociamos el evento a botón recién creado.
        const form = document.querySelector(`#editarProducto-${producto.id}-modal`);
        form.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const data = new FormData(form);
            let obj = {}
            data.forEach((value,key) => obj[key]=value);
            await updateProductAPI(Number(producto.id), obj);
            location.reload();
        });

        document.querySelector(`#borrarProducto-${producto.id}-modal`).addEventListener("click", async () => {
            Swal.fire({
                title: 'Estas seguro?',
                text: `Borraras el producto ${producto.nombre}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    deleteProductAPI(Number(producto.id)).then(res => {
                        location.reload();
                      })
                }
              })
        });
})
}

const productosHTML = document.getElementById("productos");
const initial = async ()=>{
    await getProductsFromAPI();
    productosHTML.innerHTML = "";
    escribirProductosHTML(productos);
    escribirModalesHTML(productos);
}
initial();