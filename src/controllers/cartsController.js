import cartsManager from "../models/cartsManager.js";
import productsManager from "../models/productsManager.js";

const getProducts = async (req, res)=>{
    const idCart = Number(req.params.id);
    const data = await cartsManager.getProducts(idCart);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.status(200).json(data);
};

const createCart = async (req, res)=>{
    const data = await cartsManager.createCart();
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.status(201).json(data);
};

const addProduct = async (req, res)=>{
    const idCart = Number(req.params.id);
    const idProd = Number(req.body.idProd);
    const product = await productsManager.getById(idProd);
    if (product?.error) return res.status(product.error.status).json(product.error.message);
    product.quantity = Number(req.body.quantity);
    if (product.quantity > product.product.stock) return res.status(400).json(`Stock insuficiente: solo quedan ${product.product.stock} unidades`);
    const data = await cartsManager.addProduct(idCart, product);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
};

const deleteById = async (req, res)=>{
    const idCart = Number(req.params.id);
    const data = await cartsManager.deleteById(idCart);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
};

const deleteProductById = async (req, res)=>{
    const idCart = Number(req.params.id);
    const idProd = Number(req.params.id_prod);
    const product = await productsManager.getById(idProd);
    if (product?.error) return res.status(product.error.status).json(product.error.message);
    const data = await cartsManager.deleteProductById(idCart, idProd);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
};

export default {
    getProducts,
    createCart,
    addProduct,
    deleteById,
    deleteProductById
}