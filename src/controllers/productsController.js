import productsManager from "../models/productsManager.js";

const getAll = async (req, res)=>{
    const products = await productsManager.getAll();
    if (products?.error) return res.status(products.error.status).json(products.error.message);
    res.status(200).json(products);
};

const getById = async (req, res)=>{
    const id = req.params.id;
    const product = await productsManager.getById(id);
    if (product?.error) return res.status(product.error.status).json(product.error.message);
    res.status(200).json(product);
};

const add = async (req, res)=>{
    const product = req.body;
    const data = await productsManager.add(product);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(201);
};

const updateById = async (req, res)=>{
    const id = req.params.id;
    const product = req.body;
    const data = await productsManager.updateById(id, product);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
};

const deleteById = async (req, res)=>{
    const id = req.params.id;
    const data = await productsManager.deleteById(id);
    if (data?.error) return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
};

export default {
    getAll,
    getById,
    add,
    updateById,
    deleteById
}