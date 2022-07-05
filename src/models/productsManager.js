import fileManager from "../services/fileManager.js";

class productsManager {
    constructor(){
        this.products = [];
    }
    async getAll(){
        try {
            this.products = await fileManager.read("products.json");
            return {products: this.products};
        } catch (error) {
            console.log(`error in getting products: ${error}`);
            return {error: {message: "error in getting products", status: 500}};
        }
    }
    async getById(id){
        try {
            this.products = await fileManager.read("products.json");
            const product = this.products.find(prod => prod.id == id);
            if (product) return {product};
            return {error: {message: `no product with ID: ${id}`, status: 404}};
        } catch (error) {
            console.log(`error in getting the product: ${error}`);
            return {error: {message: "error in getting product", status: 500}};
        }
    }
    async add(productData){
        try {
            this.products = await fileManager.read("products.json");
            const product = {
                id: Number(this.products[this.products.length-1]?.id+1 || 1),
                timestamp: Date.now(),
                nombre: productData.nombre || null,
                descripcion: productData.descripcion || null,
                codigo: productData.codigo || null,
                foto: productData.foto || null,
                precio: productData.precio || null,
                stock: productData.stock || null
            }
            this.products.push(product);
            await fileManager.write("products.json", this.products);
        } catch (error) {
            console.log(`error in adding product: ${error}`);
            return {error: {message: "error in adding product", status: 500}};
        }
    }
    async updateById(id, productNewData){
        try {
            const data = await fileManager.read("products.json");
            const exist = data.find(prod => prod.id == id);
            if (!exist) return {error: {message: `no product with ID: ${id}`, status: 404}}
            this.products = data.map(prod => {
                if (prod.id == id){
                    const product = {
                        id: Number(id),
                        timestamp: Date.now(),
                        nombre: productNewData.nombre || prod.nombre,
                        descripcion: productNewData.descripcion || prod.descripcion,
                        codigo: productNewData.codigo || prod.codigo,
                        foto: productNewData.foto || prod.foto,
                        precio: productNewData.precio || prod.precio,
                        stock: productNewData.stock || prod.stock
                    }
                    return product
                } else{
                    return prod
                }
            });
            await fileManager.write("products.json", this.products);
        } catch (error) {
            console.log(`error in updating product: ${error}`);
            return {error: {message: "error in updating product", status: 500}};
        }
    }
    async deleteById(id){
        try {
            const data = await fileManager.read("products.json");
            const exist = data.find(prod => prod.id == id);
            if (!exist) return {error: {message: `no product with ID: ${id}`, status: 404}};
            this.products = data.filter(prod => prod.id != id);
            await fileManager.write("products.json", this.products);
        } catch (error) {
            console.log(`error in deleting product: ${error}`);
            return {error: {message: "error in deleting product", status: 500}};
        }
    }
}

export default new productsManager();