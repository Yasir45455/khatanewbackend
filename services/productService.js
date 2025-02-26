const productRepo = require("../repositories/productRepository");

const createProduct = async (data) => await productRepo.createProduct(data);
const getAllProducts = async () => await productRepo.getAllProducts();
const getProductById = async (id) => await productRepo.getProductById(id);
const updateProduct = async (id, data) => await productRepo.updateProduct(id, data);
const deleteProduct = async (id) => await productRepo.deleteProduct(id);

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
