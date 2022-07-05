import fileManager from "../services/fileManager.js";

class cartsManager {
    constructor(){
        this.carts = [];
    }
    async getProducts(idCart){
        try {
            this.carts = await fileManager.read("carts.json");
            const cart = this.carts.find(c => c.id == idCart);
            if (!cart) return {error: {message: `no cart with ID: ${idCart}`, status: 404}};
            const products = cart.productos;
            return {products}; 
        } catch (error) {
            console.log(`error in getting cart products: ${error}`);
            return {error: {message: "error in getting cart products", status: 500}};
        }
    }
    async createCart(){
        try {
            this.carts = await fileManager.read("carts.json");
            const newCart = {
                id: Number(this.carts[this.carts.length-1]?.id+1 || 1),
                timestamp: Date.now(),
                productos: []
            };
            this.carts.push(newCart);
            await fileManager.write("carts.json", this.carts);
            return { idCart:newCart.id };
        } catch (error) {
            console.log(`error in creating cart: ${error}`);
            return {error: {message: "error in creating cart", status: 500}};
        }
    }
    async addProduct(idCart, product){
        try {
            this.carts = await fileManager.read("carts.json");
            const cart = this.carts.find(cart => cart.id == idCart);
            if (!cart) return {error: {message: `no cart with ID: ${idCart}`, status: 404}};
            cart.productos.push(product);
            this.carts = this.carts.map( c => {
                if (c.id == idCart) return cart;
                return c;
            });
            await fileManager.write("carts.json", this.carts);
        } catch (error) {
            console.log(`error in adding product to cart: ${error}`);
            return {error: {message: "error in adding product to cart", status: 500}};
        }
    }
    async deleteById(idCart){
        try {
            this.carts = await fileManager.read("carts.json");
            const cart = this.carts.find(cart => cart.id == idCart);
            if (!cart) return {error: {message: `no cart with ID: ${idCart}`, status: 404}};
            this.carts = this.carts.filter(c => c.id != idCart);
            await fileManager.write("carts.json", this.carts);
        } catch (error) {
            console.log(`error in deleting cart: ${error}`);
            return {error: {message: "error in deleting cart", status: 500}};
        }
    }
    async deleteProductById(idCart, idProd){
        try {
            this.carts = await fileManager.read("carts.json");
            const cart = this.carts.find(cart => cart.id == idCart);
            if (!cart) return {error: {message: `no cart with ID: ${idCart}`, status: 404}};
            cart.productos = cart.productos.filter(prod => prod.product.id != idProd);
            this.carts = this.carts.map(c => {
                if (c.id == idCart) return cart;
                return c;
            });
            await fileManager.write("carts.json", this.carts);
        } catch (error) {
            console.log(`error in deleting product from cart: ${error}`);
            return {error: {message: "error in deleting product from cart", status: 500}};
        }
    }
}

export default new cartsManager();